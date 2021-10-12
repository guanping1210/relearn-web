const express = require('express')
const bodyParse = require('body-parser')
// 数据库资源请求进来
const { User } = require('../model/user')
const admin = express.Router()

admin.get('/login', (req, res) => {
    // res.send('博客管理页面')
    res.render('admin/login')
})

// 登录功能
admin.post('/login', async (req, res) => {
    // 接收请求参数和密码 req.body
    const { email = '', password = '' } = req.body
    // 对参数进行验证
    if(!email || !password) {
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
        return 
    }

    // email作为唯一值，来查询
    const checkUser = await User.findOne({ email })
    
    // 查询所有数据，返回数组然后筛选 fin() | 直接用参数进行查询一条数据 findOne()
    if(!checkUser) {
        res.status(400).render('admin/error', { msg: '该用户不存在' })
        return 
    }

    if(checkUser.password !== password) {
        res.status(400).render('admin/error', { msg: '登录密码错误' })
        return 
    }

    // 验证通过
    res.send('登录成功')
})

admin.get('/login', (req, res) => {
    res.send('博客管理页面')
})



module.exports = admin