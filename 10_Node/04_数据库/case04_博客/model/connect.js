/**
 * 连接数据库操作
 */
const mongoose = require('mongoose')

// 链接数据库
mongoose.connect('mongodb://localhost/blog')
    .then(res => { console.log('数据库连接成功')})
    .catch(res => { console.log('数据库连接失败')})