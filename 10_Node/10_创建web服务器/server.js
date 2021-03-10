// 用于创建网站服务器的模块
const http = require('http')

// app对象就是网站服务器对象
const app = http.createServer()

// 当客户端有请求时，就会进行响应处理
app.on('request', (req, res) => {
  res.end('hello') // 响应内容
})

// 监听的端口
app.listen(3000)

console.log('服务器已启动，监听3000端口')