/**
 * 中间件：就是一堆方法，能够接收客户端的请求，做出响应，也可以将请求继续交给下一个中间件继续处理
 * app.use 处理中间件
 * 
 * 中间加应用：
 *  1、路由保护，例如登录权限，拦截请求，禁止用户访问非权限页面
 *  2、网站维护公告，在所有中间件上进行拦截
 *  3、错误处理中间件，对错误进行统一处理
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

// 网站维护
// app.use((req, res, next) => {
//     res.status(404)
//     res.send('访问的页面不存在')
//     // next()
// })

// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send('服务器端错误')
})

//   当客户端访问/request请求的时候走当前这个中间件 
app.use('/request', (req, res, next) => {
    // console.log('请求走了app.use/request中间件')
    // res.send('OK')
    throw new Error('程序发生未知错误')
    // next()
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