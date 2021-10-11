/**
 * router：第三方模块的路由管理
 * serve-static: 实现静态资源访问服务功能
 * express: 
 *      提供简洁的路由定义方式，
 *      简化http事件，
 *      对模板引擎的支持成都高，
 *      提供了中间件机制有效控制http请求，
 *      拥有大量的插件
 */
const http = require('http')
const getRouter = require('router')
const path = require('path')
const template = require('art-template')
const serveStatic = require('serve-static')

// 设置默认选项
template.defaults.root = path.join(__dirname, 'views')

const router = getRouter()
const app = http.createServer()
const serve = serveStatic(path.join(__dirname, 'public'))


// 路由
router.get('/add', (req, res) => {
    res.end('hello world')
})

router.get('/index', (req, res) => {
    res.end('index')
})


app.on('request', (req, res) => {
    // 启动路由功能：必须带回调函数，否则会报错
    router(req, res, () => {
        console.log(1111)
    })
    // 启动静态资源服务器
    server(req, res, () => {})
})
app.listen(9001)