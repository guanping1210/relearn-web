const express = require('express')
const bodyParse = require('body-parser')
// 数据库资源请求进来
const { User } = require('../model/user')
const admin = express.Router()

// 登录页面
admin.get('/login', require('./adminroute/loginPage'))

// 登录功能
admin.post('/login', require('./adminroute/login'))

// 用户页面
admin.get('/user', require('./adminroute/userPage'))

//  退出登录
admin.get('/logout', require('./adminroute/logout'))

// 添加用户页面
admin.get('/user-edit', require('./adminroute/userEditPage').userAddPage)

// 添加用户响应事件
admin.post('/user-edit', require('./adminroute/userEditPage').addOrModifyUser)

// 删除用户
admin.get('/delete', async (req, res) => {
    await User.deleteOne({ _id: req.query.id })
    console.log('用户删除成功')
    res.redirect('/admin/user')
})

// 文章管理
admin.get('/article', require('./adminroute/article').articlePage)

// 发布文章、编辑文章页面
admin.get('/article-edit', require('./adminroute/article').articleEditPage)

module.exports = admin

/**
 * cookie：存储数据空间，供服务器存储数据
 *      以域名的形式区分；
 *      有过期事件，超时会背浏览器自动删除；
 *      请求服务器会自动带上;
 * 
 * session: 服务器端的用户数据
 * 
 * 流程：
 *  客户端请求，服务端验证参数，生成sessionId，返回给客户端，存储到cookie中；
 *  客户端请求携带cookie，服务端获取cookie中的sessionId，验明身份
 * 
 * express-session
 */