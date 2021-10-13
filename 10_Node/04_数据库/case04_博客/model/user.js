/**
 * 用户管理相关的数据库操作
 * 
 * joi 批量校验
 */
const mongoose = require('mongoose')

// 定义用户的集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: true, // 邮箱作为登录凭据
        unique: true, // 保证邮箱地址不重复
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    state: {
        type: Number,
        default: 0, // 0 表示启用状态，1 表示禁用状态
    }
})

// 创建集合
const User = mongoose.model('User', userSchema)

// 初始化超级用户，默认可以登录 --> 前提是数据库中没有这个超级用户，才需要创建 -> 所以需要先查询一下数据库是否有这条数据
const initAdminUser = async () => {
    const res = await User.find({ username: 'admin', email: 'admin@qq.com' })

    // 表示数据库中没有数据，那么默认新增一个超级用户
    if(res.length === 0) {
        User.create({
            username: 'admin',
            password: '123456',
            email: 'admin@qq.com',
            role: 'admin',
            state: 0
        })
        .then(() => { console.log('超级用户创建成功') })
        .catch(() => { console.log('超级用户创建失败')})
    } else {
        console.log('超级用户admin已经存在')
    }
}

initAdminUser()

// User.create({
//     username: 'admin',
//     password: '123456',
//     email: 'admin@qq.com',
//     role: 'admin',
//     state: 0
// })
// .then(() => { console.log('超级用户创建成功') })
// .catch(() => { console.log('超级用户创建失败')})

// 将用户集合作为模块成员进行导出
module.exports = {
    User: User
}