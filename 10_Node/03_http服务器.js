/**
 * http: 构建服务器的核心模块, 专门用来编写服务器的
 */
// 1、引入服务器模块
const http = require('http')
const url = require('url') // 用于处理url参数
const path = require('path')
const fs = require('fs')

// 2、http.createServer() 创建一个web服务器，返回一个server 实例
var server = http.createServer()

// 3、服务器提供对数据的服务：发送请求、接收请求、处理请求、发送响应
// 注册request请求事件，当客户端发送请求时，触发服务器的request事件，然后执行第二个参数：回调处理
// 回调函数：request 请求对象，带有客户端的一些请求信息
//          response 响应对象
// 根据不同的路径响应不同的结果
server.on('request', function(req, response) {
    console.log('收到客户端的请求了')

    console.log('请求路径', req.url)

    // 发送响应, request.url获取到的是端口号之后的路径
    switch(req.url) {
        case '/a': response.write('我响应你了', 'utf-8'); break;
        case '/c': response.write('hello', 'utf-8'); break;
        default: response.write('success')
    }

    // Content-Type 告诉对方发送的数据内容的格式
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')

    /**
     * 解析参数，解析为对象格式:
     * search: 从url的问号后面开始截取
     * query: 把？后面的解析为[key, value]的对象格式
     */
    console.log(url.parse(req.url))

    /**
     * post参数，不是URL上的，而是在data事件中
     *  当请求参数传递的时候触发data事件，
     *  当参数传递完成的时候触发end事件
     */
    req.on('data', () => {})
    req.on('end', () => {})

    response.end()
})

// 4、绑定端口号，启动服务器
server.listen(3000, function() {
    console.log('端口3000已启动...')
})

// 服务器启动


/**
 * URI: 统一资源定位符
 * 
 * req.headers 获取请求报文
 * req.url 获取请求地址
 * req.method 获取请求方法
 */
server.on('request', (req, res) => {
    const method = req.method.toLowerCase()
    const pathname = url.parse(req.url).pathname

    if(method === 'get') {
        if(pathname === '/' || pathname === '/index') {
            res.end('欢迎来到首页')
        }
    } else if(method === 'post') {

    }
})


/**
 * 根据前端的URL获取不同的资源文件
 */
server.on('request', (req, res) => {
    let pathname = url.parse(req.url).pathname //  eg: http://localhost:3000/default.html
    let realPath = path.join(__dirname, 'public' + pathname) // 获取真实的文件路径, 实际上default.html是放置在 public 文件夹下面的

    fs.readFile(realPath, (error, result) => { // 读取文件内容
        if(error) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8' // 这儿根据读取的文件类型， 来决定返回格式
            })
            res.end('Not Found')
            return 
        }
        res.end(result) // 把文件内容发送给前端 --> 需要指定编码值，否则会乱码
    })
})