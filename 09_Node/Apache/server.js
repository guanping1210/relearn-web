const fs = require('fs')
const path = require('path')
const http = require('http')

const app = http.createServer()

// 所有放在 www 目录下的资源，都可以通过路径来访问
// http://localhost:3000/index.html --> www/index.html
// http://localhost:3000/Login/index.html --> www/Login/index.html
// http://localhost:3000/imgs/logo.jpg --> www/imgs/logo.jpg

app.on('request', function(request, response) {

    switch(request.url) {
        case '/index.html': {
            fs.readFile(path.resolve(__dirname, './www/index.html'), (err, data) => {
                if(err) {
                    response.end('404 Not Found')
                }
                response.setHeader('Content-Type', 'text/html;charset=uft-8')
                response.end(data.toString())

            })
            break;
        }

        case '/Login/index.html': {
            fs.readFile(path.resolve(__dirname, './www/Login/index.html'), (err, data) => {
                if(err) {
                    response.end('404 Not Found')
                }
                response.setHeader('Content-Type', 'text/html;charset=uft-8')
                response.end(data.toString())
            })
            break
        }

        case '/imgs/logo.jpg': {
            fs.readFile(path.resolve(__dirname, './www/imgs/logo.jpg'), (err, data) => {
                if(err) {
                    response.end('404 Not Found')
                }
                response.setHeader('Content-Type', 'image/jpeg;charset=uft-8')
                response.end(data)
            })
            break
        }

        default: {
            fs.readFile(path.resolve(__dirname, './www/template.html'), (err, data) => {
                if(err) {
                    response.end('404 Not Found')
                }
                response.setHeader('Content-Type', 'text/html;charset=uft-8')
                response.end(data.toString())
            })
            break
            break
        }
    }
})

app.listen(3000, function() {
    console.log('模拟apache已经启动')
})
