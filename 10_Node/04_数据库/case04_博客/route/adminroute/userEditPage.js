const Joi = require('joi')
const { User } = require('../../model/user')

const userSchema = Joi.object({
    username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规范')),
    email: Joi.string().required().email().error(new Error('邮箱格式不正确')),
    password: Joi.string().regex(/^[za-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不正确')),
    role: Joi.string().valid('admin', 'normal').required().error(new Error('角色值非法')),
    state: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
})

const userAddPage = async(req, res) => {
    // 通过 id 来判断是新增还是修改
    const { message, id } = req.query
    if(id) {
        // 修改操作：先根据ID查找用户
        const user = await User.findOne({ _id: id })
        res.render('admin/user-edit', { button: '修改', message: '编辑用户信息', user });
    } else {
        res.render('admin/user-edit', { button: '新增', message });
    }
    
}

const editUserPage = async(req, res) => {
    res.render('admin/user-edit', { button: '修改', message: '编辑用户信息' });
}

const addOrModifyUser = async(req, res, next) => {
    // 通过 id 来判断是新增还是修改
    const { message, id } = req.query
    // 验证新增用户的信息
    try {
        await userSchema.validateAsync(req.body)
        // res.send(req.body)
    } catch(ex) {
        // res.send(ex.message)
        // res.redirect(`/admin/user-edit?message=${ex.message}`)
        // 用中间件来处理错误，通过 next 向下执行，会走到错误处理中间件
        return next(JSON.stringify({ message: ex.message, path: '/admin/user-edit'}))
    }

    // 填写的信息验证通过之后，需要和数据库中的邮箱进行比对，因为邮箱是作为唯一值的
    const user = await User.findOne({ email: req.body.email })
    if(user && !id) {
        // res.redirect(`/admin/user-edit?message=该邮箱已被注册过了`)
        return next(JSON.stringify({ message: '该邮箱已被注册过了', path: '/admin/user-edit'}))
    } else if(user && id) { //  修改用户
        await User.updateOne({ _id: id}, req.body)
        res.redirect('/admin/user')
        console.log('修改用户成功')
    } else  { // 新增用户
        await User.create(req.body)
        res.redirect('/admin/user')
        console.log('新建用户成功')
    }
}

const modifyUser = async(req, res) => {
    res.send('')
}

module.exports = {
    userAddPage,
    editUserPage,
    addOrModifyUser,
    modifyUser
}