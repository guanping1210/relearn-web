// 退出功能
module.exports = async (req, res, next) => {
    // 删除session
    req.session.destory(function() {
        // 删除cookie
        res.clearCookie('connect.sid')
    })
    res.redirect('/admin/login')
}