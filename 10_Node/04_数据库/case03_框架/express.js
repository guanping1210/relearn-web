const express = require('express')
const app = express()

// 自定义路由
const home = require('./home-route')
const admin = require('./admin-route')

// 创建路由对象
// const home = express.Router()

app.use('/home', home)
app.use('/admin', admin)

app.get('/home/index', (req, res) => {
    console.log(req.query)
    res.send(req.params)
})


// 意味着访问路径是 /home/index
// home.get('/index', (req, res) => {
//     res.send('首页')
// })

app.listen(9003)