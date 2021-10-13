const express = require('express')
const path = require('path')
const bodyParse = require('body-parser')
const session = require('express-session')
const admin = require('./route/admin')
const home = require('./route/home')
const loginProxy = require('./middleware/loginProxy')
const app = express()

// 引入数据库功能模块
require('./model/connect')
require('./model/user')


// 开放静态资源文件
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

/**
 * 中间件是有顺序的，从上到下依次执行
 */

// 全局处理, 拦截所有的请求, bodyParse能够将所有的post参数处理为 {key:value } 格式
app.use(bodyParse.urlencoded({ extened: false }))
// 统一拦截请求，处理session
app.use(session({ secret: 'secret key'}))
// 统一拦截登录请求，判断是否登录：未登录则跳转去登录页面；已登录就去首页
app.use('/admin', loginProxy.proxy)


// 模板位置
app.set('views', path.join(__dirname, 'views'))
// 模板默认后缀
app.set('view engine', 'art')
// 渲染后缀为art时， 所适用的模板引擎时什么
app.engine('art', require('express-art-template'))

app.use('/admin', admin)
app.use('/home', home)

// 错误处理中间件, 统一处理错误
app.use((err, req, res, next) => {
    console.log(err)
    // const e = JSON.parse(err)
    // res.redirect(`${e.path}?message=${e.message}`)
})


app.listen(80)