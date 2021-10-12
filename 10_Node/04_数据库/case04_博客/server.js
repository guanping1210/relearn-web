const express = require('express')
const path = require('path')
const bodyParse = require('body-parser')

const admin = require('./route/admin')
const home = require('./route/home')

const app = express()

// 全局处理, 拦截所有的请求, bodyParse能够将所有的post参数处理为 {key:value } 格式
app.use(bodyParse.urlencoded({ extened: false }))

// 引入数据库功能模块
require('./model/connect')
require('./model/user')

// 模板位置
app.set('views', path.join(__dirname, 'views'))
// 模板默认后缀
app.set('view engine', 'art')
// 渲染后缀为art时， 所适用的模板引擎时什么
app.engine('art', require('express-art-template'))


// 开放静态资源文件
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))


app.use('/admin', admin)
app.use('/home', home)


app.listen(80)