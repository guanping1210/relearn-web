/**
 * http: 构建服务器的核心模块, 专门用来编写服务器的
 */
// 1、引入服务器模块
const http = require('http')

// 2、http.createServer() 创建一个web服务器，返回一个server 实例
var server = http.createServer()

// 3、服务器提供对数据的服务：发送请求、接收请求、处理请求、发送响应
// 注册request请求事件，当客户端发送请求时，触发服务器的request事件，然后执行第二个参数：回调处理
// 回调函数：request 请求对象，带有客户端的一些请求信息
//          response 响应对象
// 根据不同的路径响应不同的结果
server.on('request', function(request, response) {
    console.log('收到客户端的请求了')

    console.log('请求路径', request.url)

    // 发送响应, request.url获取到的是端口号之后的路径
    switch(request.url) {
        case '/a': response.write('我响应你了', 'utf-8'); break;
        case '/c': response.write('hello', 'utf-8'); break;
        default: response.write('success')
    }

    response.end()
})

// 4、绑定端口号，启动服务器
server.listen(3000, function() {
    console.log('端口3000已启动...')
})


/**
 * URI: 统一资源定位符
 */
