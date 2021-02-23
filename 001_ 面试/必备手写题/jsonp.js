/**
 * jsonp: 解决跨域问题，核心是利用script标签可跨域的特性，向服务端发送一个函数参数，让服务端把需要的数据传递到函数内部
 * 
 */

const express = require("express")

// 客户端
function jsonpCallback(data) {
    console.log('通过jsonp获取的数据：', data)
}

function jsonpAjax(url) {
    const url_ = `url?callback=${jsonpCallback}`
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = url_
    document.body.appendChild(script)
}

jsonpAjax()

// 服务端
const app = express()
app.get('/xxx', (req, res) => {
    res.jsonp({
        // 传递给前端的数据
    })
})