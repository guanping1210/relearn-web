// @ts-nocheck
/**
 * 监控请求接口：
 *  1、监控所有接口
 *  2、监控并记录所有接口请求的返回状态和返回结果
 *  3、监控接口的报错情况，及时定位线上问题产生的原因
 *  4、分析接口性能
 * 
 * 接口请求有fetch，axios等，但是都是基于window.XMLHttpRequest进行了封装
 * 所以我们要监听这个对象的一些事件，就能够把请求的信息分离出来
 */
import { encrypToObj, setCommonProperty, base64EncodeUnicode } from './utils'

// API 日志, 基于setCommonProperty
function HttpLogInfo(uploadType, url, status, statusText, statusResult, currentTime, loadTime) {
    setCommonProperty.apply(this)

    this.uploadType = uploadType
    this.httpUrl = base64EncodeUnicode(encodeURIComponent(url))
    this.status = status
    this.statusText = statusText
    this.statusResult = statusResult
    this.happenTime = currentTime
    this.loadTime = loadTime
}

function recordHttpLog() {
    // 监听ajax的状态
    function ajaxEventTrigger(event) {
        let ajaxEvent = new CustomEvent(event, { detail: this })
        window.dispatchEvent(ajaxEvent)
    }

    let oldXHR = window.XMLHttpRequest

    // 重写xhr, 添加一些事件的监听处理
    function newXHR() {
        let realXHR = new oldXHR()
        realXHR.addEventListener('loadstart', function() {
            ajaxEventTrigger.call(this, 'ajaxLOadStart')
        })

        realXHR.addEventListener('loadend', function() {
            ajaxEventTrigger.call(this, 'ajaxLoadEnd')
        })

        return realXHR
    }

    let timeRecordArray = [] // 定义一个数组来存储API请求的个数和顺序

    function handleHttpResult (i, response) {
        if(!timeRecordArray[i] || timeRecordArray[i].uploadFlag === true) {
            return
        }

        let responseText = ''
        try{
            responseText = response ? JSON.stringify(encrypToObj(JSON.parse(response))) : ''
        }catch(e) {
            response = ''
        }

        const { simpleUrl, event, timeStamp } = timeRecordArray[i] || {}
        const { responseURL: url, statusText } = event.detail

        let currentTime = new Date().getTime()
        let loadTime = currentTime - timeStamp

        if(!url || url.indexOf('HTTP_UPLOAD_LOG_API') !== -1) return

        let httpLogInfoStart = new HttpLogInfo('HTTP_LOG', simpleUrl, url, status, statusText, '发起请求', timeStamp, 0)
        httpLogInfoStart.handleLogInfo('HTTP_LOG', httpLogInfoStart)

        let httpLogInfoEnd = new HttpLogInfo('HTTP_LOG', simpleUrl, url, status, statusText, '请求返回', responseText, currentTime, loadTime)
        httpLogInfoEnd.handleLogInfo('HTTP_LOG', httpLogInfoEnd)

        // 当前请求成功后，将该对象的uploadFlag设置为true，代表已经上传
        timeRecordArray[i].uploadFlag = true
    }

    window.XMLHttpRequest = newXHR
    window.addEventListener('ajaxLoadStart', function(e) {
        let tempObj = {
            timeStamp: new Date().getTime(),
            event: e,
            simpleUrl: window.location.href.split('?')[0].replace('#', ''),
            uploadFlag: false
        }

        timeRecordArray.push(tempObj)
    })
    window.addEventListener('ajaxLoadEnd', function() {
        for(let i = 0; i < timeRecordArray.length; i ++) {
            if(timeRecordArray[i].uploadFlag === true) continue
            if(timeRecordArray[i].event.detail.status > 0) {
                let responseType = (timeRecordArray[i].event.detail.responseType + '').toLowerCase()
                if(responseType === 'blob') { // 后端返回是文件的话，需要特殊处理
                    let reader = new FileReader()
                    reader.onload = function() {
                        let responseText = reader.result
                        handleHttpResult(i, responseText)
                    }
                } else {
                    let responseText = timeRecordArray[i].event.detail.responseText
                    handleHttpResult(i, responseText)
                }
            }
        }
    })
}

/**
 * 此时还不能监听fetch中的primise,那么在监控代码执行之前，重写一些fetch，就能够监听fetch发送的请求了
 */
let _fetch = fetch
window.fetch = function() {
    return _fetch.apply(this, arguments)
        .then((res) => {
            // 可以添加监控fetch promise的代码，获取到res 的相关信息
            // 能够拿到url，code， header, response等信息
            return res
        })
}