/**
 * 1、搭建网站服务器，实现客户端和服务器端通信
 * 2、连接数据库，创建用户集合，向集合中插入文档
 * 3、访问/list时，显示用户列表
 * 4、访问/add时，呈现新增用户页面
 * 5、访问/modify，呈现修改页面，并修改用户信息
 * 6、访问/delete，实现删除用户功能
 */
const http = require('http')
const mongoose = require('mongoose')
const url = require('url')
const app = http.createServer()

//连接数据库
mongoose.connect('mongodb://localhost/playtest')
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(() => {
        console.log('数据库连接失败')
    })

// 创建数据集
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 20 },
    age: { type: Number, min: 18, max: 80},
    password: { type: String },
    email: { type: String },
    hobbits: [String],
})

const User = mongoose.model('User', userSchema)


app.on('request', (req, res) => {
    const method = req.method
    const { pathname } = url.parse(req.url)
    console.log(555, method, pathname)
    if(method === 'GET') {
        if(pathname === '/' || pathname === '/index') {
            
        }

    } else if(method === 'POST') {
        
    }
    res.end('ok')
})

app.listen(9000)