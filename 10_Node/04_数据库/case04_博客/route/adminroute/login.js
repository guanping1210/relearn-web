// 数据库资源请求进来
const { User } = require('../../model/user')

const login = async (req, res) => {
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

    // 验证通过,登录成功跳转去首页
    // 登录成功后，需要服务器响应一个cookie， 下次就可以用cookie去验证用户信息，就不需要再次输入密码登录
    // res.send('登录成功')
    req.session.username = checkUser.username // express-session会自动生成一个sessionId，存储到cookie中
    // 设置全局对象，所有模板都可以使用
    req.app.locals.userInfo = checkUser
    res.redirect('/admin/user')
}

module.exports = login