// @ts-nocheck
/**
 * 基于axios封装api请求，实现如下功能：
 *  1、使用单例模式，减少消耗
 *  2、支持各种请求方式，以及根据请求方式的不同对参数进行不同的规范处理
 *  3、处理401逻辑，处理用户中心的跳转问题
 *  4、由于用户中心是独立的，用jsonp获取用户中心返回的用户信息
 */
import axios from 'axios'

// 设置支持的请求方式
const methods = ['get', 'post', 'delete', 'put']
const paramsMethods = ['get', 'delete']

// axios的delete、get请求方式的参数是params，post是body传参
class Api {
    constructor() {
        methods.forEach(method => {
            this[method] = (path, data = {}, headers = {}) => {
                return new Promise((resolve, reject) => {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers
                        }
                    }
                    data = paramsMethods.includes(method) ? { params: data, ...config } : data

                    this.doFetch(method, path, data, config, resolve, reject)
                })
            }
        })
    }

    // 发起请求
    doFetch(method, path, data, config, resolve, reject) {
        const oauth = localStorage.getItem('oauth') // 获取本地 token

        //  检测token是否过期，过期需要重新发请求
        if(oauth && oauth.token && +new Date() - oauth.tokenExpired >= 0) {
            this.doRefreshToken()
        } else { // 有token且没过期，把token带在header请求上
            config.headers.Authorization = oauth ? oauth.token : ''
            axios[method](path, data, config)
                .then(({ data }) => {
                    if(data.code === 200) {
                        resolve(data.data)
                    } else {
                        reject(data)
                    }
                })
                .catch(async error => {
                    // 如果是特殊的401，那么需要重新发起登录请求
                    if(error.response && error.response.status === 401) {
                        this.doRefreshToken(method, path, data, config, resolve, reject)
                    }
                })
        }
    }

    // 过期401，重走登录逻辑, 
    async doRefreshToken(method, path, data, config, resolve, reject) {
        const oauth = localStorage.getItem('oauth')
        localStorage.removeItem('oauth') // 记录下之前的token，因为已经过期了，所以需要清除，后面会记录新的有效token

        if(oauth && oauth.refreshToken && +new Date() - oauth.refreshTokenExpires < 0) {
            // 有refreshToken 且在有效期内，刷新token即可
            const res = await this.get(`/oauth/token?type=refresh_token&refresh_token=${oauth.refreshToken}`)
            if(res && res.access_token) {
                localStorage.setItem('oauth', res) // 本地记录
                // token请求成功，继续请求原来的接口
                this.doFetch(method, path, data, config, resolve, reject)
            }
        } else {
            this.getToken(method, path, data, config, resolve, reject)
        }
    }

    // 获取token，通过jsonp 获取 实现SSO单点登录
    getToken(method, path, data, config, resolve, reject) {
        jsonp(url, null, (err, res) => {
            if(!err && res) {
                localStorage.setItem('oauth', res)
                this.doFetch(method, path, data, config, resolve, reject)
            } else {
                goToLoginUrl()
            }
        })
    }
}

// 单例模式
export default new Api()

// 跳转到登录地址
function goToLoginUrl() {
    const loginUrl = `${api}/oauth/authoriez?redirect_uri=${encodeURIComponent(window.location.href)}` // 指定回跳的地址

    window.location.href = loginUrl // 跳转
}