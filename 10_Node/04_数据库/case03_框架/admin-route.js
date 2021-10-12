const express = require('express')

// 创建路由对象
const admin = express.Router()


// 意味着访问路径是 /home/index
admin.get('/index', (req, res) => {
    res.send('首页')
})

module.exports = admin
