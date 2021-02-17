const fs = require('fs')
const path = require('path')
const http = require('http')

const app = http.createServer()

// 所有放在 www 目录下的资源，都可以通过路径来访问
// http://localhost:3000/index.html --> www/index.html
// http://localhost:3000/Login/index.html --> www/Login/index.html
// http://localhost:3000/imgs/logo.jpg --> www/imgs/logo.jpg

let filesArray = []

app.on('request', function(request, response) {
    // 如何得到www目录列表中的文件名和目录名 --> fs.readdir
    // 如何将得到的文件名和目录，替换到template.html中 --> 模板引擎
    // TODO: 碰到文件夹，需要递归处理
    fs.readFile(path.resolve(__dirname, './www/template.html'), (err, data) => {
        if(err) {
            response.end('404 Not Found')
        }

        if(request.url === '/') {
            fs.readdir(path.resolve(__dirname, './www'), (err, files) => {
                if(err) {
                    response.end('Can not find www dir')
                }
                
                filesArray = files
                const content = data.toString().split('<div id="root">')
                let addDir = ''
    
                files.filter(item => item !== 'template.html').forEach(item => {
                    const isDir = fs.lstatSync(path.resolve(__dirname, `./www/${item}`)).isDirectory()
                    addDir += `<div><span style="display: inline-block; min-width: 100px">${isDir ? '文件夹' : '文件'}</span> <a href="${item}">${item}</a><br /></div>`
                })
    
                response.setHeader('Content-Type', 'text/html;charset=uft-8')
                response.end(content[0]  + addDir + content[1])
            })
        } else {
            fs.readFile(path.resolve(__dirname, `./www${request.url}`), (err, data) => {
                if(err) {
                    return response.end(`Can not find www ${request.url}`)
                }
                response.setHeader('Content-Type', 'text/html;charset=uft-8')
                response.end(data.toString())
            })
        }
    })
})

app.listen(3000, function() {
    console.log('模拟apache已经启动')
})
