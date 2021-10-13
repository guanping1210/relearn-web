const { User } = require('../../model/user')

module.exports = async(req, res) => {
    // 接收分页参数
    const page = req.query.page || 1
    let pagesize = 5

    // 设置分页， 查询总数
    const count = await User.countDocuments()

    let total = Math.ceil(count / pagesize);

    // 分页查询 limit 限制查询数量；skip 跳过多少条数据
    const users = await User.find().limit(pagesize).skip((page - 1) & pagesize)

    res.render('admin/user', {
        users,
        total,
        page,
    });
}