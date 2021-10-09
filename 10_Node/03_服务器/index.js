/**
 * 端口：
 * URL：统一资源定位符，也就是所说的网址
 */

const http = require('http')
const url = require('url')
// 创建web服务器, app对象就是网站服务器对象
const app = http.createServer()
// 当客户端发送请求的时候
app.on('request', (req, res) => {
    console.log(url)
    // 响应
    res.end('<h4>hello</h4>22')
})
app.listen(9000)
console.log('服务器已经启动，监听9000端口，通过localhost:9000访问')