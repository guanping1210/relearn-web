const express = require('express')

// 创建路由对象
const home = express.Router()


// 意味着访问路径是 /home/index
home.get('/index', (req, res) => {
    res.send(req.query)
})

module.exports = home
