/**
 * 登录拦截
 */

const proxy = async(req, res, next) => {
    // 判断用户是否访问的登录页面 + 判断用户的登录状态，已登录则放行；未登录则取登录页面
    if(req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 用户已经登录，那么调用next将请求放行
        next()
    }
}

module.exports = {
    proxy,
}