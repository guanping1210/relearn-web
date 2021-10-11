/**
 * 中间件：就是一堆方法，能够接收客户端的请求，做出响应，也可以将请求继续交给下一个中间件继续处理
 * app.use 处理中间件
 * 
 * 中间加应用：
 *  1、路由保护，例如登录权限，拦截请求，禁止用户访问非权限页面
 *  2、
 */
const express = require('express')

const app = express()

/**
 * app.use 
 */
 app.use((req, res , next) =>{
     console.log('请求走了 app.use 中间件')
     next()
 })

//   当客户端访问/request请求的时候走当前这个中间件
app.use('/request', (req, res, next) => {
    console.log('请求走了app.use/request中间件')
    res.send('OK')
    next()
})

app.get('/', (req, res, next) => {
    /**
     * send: 自动检测响应类型、自动设置http状态码、自动设置编码
     */
     console.log('111111')
     next()
    // next 执行的，就是表示走到下一个中间件，执行下一个方法
})

app.get('/request', (req, res, next) => {
    console.log('22222222')
    next()
})


app.listen(9002)