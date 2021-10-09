/**
 * mongoose： 第三方插件，连接数据库
 * 启动mongoDB: net start/stop mongoDB (管理员运行)
 * mongoose: 是个promise
 * 
 * 创建数据库集合1：
 *  1、定义集合规则，也就是字段规则 mongoose.Schema
 *  2、创建集合, 首字母要大写 mongoose.model
 *  3、使用集合实例创建数据, 实例是构造函数, 创建数据 new xxx()
 *  4、保存数据 xxx.save
 * 
 * 创建数据库集合2：
 *  1、定义集合规则 schema = new mongoose.Schema()
 *  2、创建集合 xxx = mongoose.model(name, schema)
 *  3、创建数据 xxx.create()
 * 
 * 查询数据库中的数据：返回的都是数组
 *  1、集合.find()  返回的是数组，接收的过滤条件是个对象
 *  2、集合.findOne() 返回的是第一条数据
 *  3、表达式查询 $xxx --> $gt 表示 >; $lt 表示 <; $in 表示包含
 * 
 * mongo支持异步函数的语法：promise
 * 
 * 数据库中所有的操作都是异步操作
 * 
 * MongoDB数据库导入数据：需要配置 mongoimport  为全局系统变量，否则找不到 （找到mongodb目录bin下的mongoimport.exe，添加到系统变量中）
 *  
 *  mongoimport -d 数据库名称 -c 集合名称 --file 要导入的数据文件  |  mongo可视化工具中导出/导入
 */

const mongoose = require('mongoose')

// playtest 是数据库名字，如果没有，则会自动创建
mongoose.connect('mongodb://localhost/playtest')
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(() => {
        console.log('数据库连接失败')
    })

/**
 * 1、创建集合规则， 可以设置校验规则， 自定义规则 ： 条件 | [条件, 自定义提示语]
 *  通用：
 *      required 必填项目
 *      enum 枚举值，需要列举中当前字段可以拥有的值， [xxx, yyy] | { values: [], message: 'xxx' }, 存入的值必须是[]以内的值
 *      validate: {
 *          validator: v => {}, // 自定义函数校验规则， 返回布尔值， v 表示要验证的值
 *          message: 'xxxx', // 自定义错误信息
 *      }
 * 
 *  String:
 *      minlength 最小长度  number | [number, 自定义提示语]
 *      maxlength 最大长度
 *      trim 去掉空格
 *      
 * 
 *  number：
 *      min 最小数值
 *      max 最大数值
 * 
 *  Date:
 *      defualt 指定默认值 Date.now
 */
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    // price: Number
    price: {
        type: String,
        // required: true, // 设置必填，否则会报错
        required: [true, '请传入价格'],
        minlength: 2,
        trim: true,
    }
})

// 2、使用规则创建集合, 返回的是构造函数，里面包含很多方法，可以操作数据库
const Course = mongoose.model('Course', courseSchema) // 实际数据库中存储的名字是 courses

// 3-1、构造数据， 使用构造函数创建数据
// const course = new Course({
//     name: 'JS 高级程序',
//     author: 'KaSong',
//     isPublished: true,
//     price: 20
// })

// 4、保存数据，写入数据库
// course.save()

// 5、向数据库中插入文档（数据）的另一种方式: 支持回调函数，也支持promise.then
// Course.create({
//     name: 'JavaScript',
//     author: 'pingguan',
//     isPublished: false,
//     price: 100.01
// })
// .then(res => {
//     console.log(res)
// })
// .catch(err => {
//     console.log(err)
// })


// 6.1、查询文档（查数据库数据）, find中可以书写条件
Course.find().then(res => {
    console.log('查询所有数据：', res)
})

// 6.2 带查询条件的查询， 查询_id = 6161358954ab8502c1085bf2 的这条数据
Course.find({
    _id: '6161358954ab8502c1085bf2'
}).then(res => {
    console.log('指定ID查询：', res)
})

// 6.3 查询第一条数据, 返回的是个对象
Course.findOne().then(res => {
    console.log('默认查询第一条数据：', res)
})

/**
 * 6.4 表达式查询:
 * 
 * $gt 表示 >
 * $lt 表示 <
 * $in 表示包含（完全匹配
 */
Course.find({
    price: { $gt: 40, $lt: 90 },
    author: {  $in: 'KaSong' }
})
.then(res => {
    console.log('查询price大于40， 小于90的数据: ', res)
})

/**
 * 6.5 指定字段查询，也就是返回指定字段, ID 是必须的， 不想要的话，可以在前面加-, 表示不返回 -_id
 */
Course.find({  author: {  $in: 'KaSong' } }).select('name price')
.then(res => {
    console.log('结果只要指定字段：', res)
})

/**
 * 6.6 排序, sort指定排序字段，默认升序，加个-前缀，表示降序
 *  price 价格升序排列
 * -price 价格降序排列
 */
Course.find().sort('-price').then(res => {
    console.log('排序之后返回结果：', res)
})

/**
 * 6.7 skip 跳过多少条数据， limit 限制查询数量
 */
Course.find().skip(2).limit(1) // 表示跳过前2条数据，limit 表示限制只查2条数据，通常用于分页
.then(res => {
    console.log('查询数量限制：', res)
})

/**
 * 7. 删除文档（数据）, 返回的是删除的这条数据的内容
 *    findOneAndDelete 删除一条数据，接收查询条件
 *    deleteMany 删除多条数据，接收查询条件；不指定条件，会删除所有
 */
// Course.findOneAndDelete({ _id: '6161358954ab8502c1085bf2' }).then(res => {
//     console.log('删除这条ID=6161358954ab8502c1085bf2的数据：', res)
// })

// Course.deleteMany({ _id: '6161358954ab8502c1085bf2' }).then(res => {
//     console.log('删除这条ID=6161358954ab8502c1085bf2的数据：', res)
// })

/**
 * 8 更新文档（数据）
 *      updateOne({ 查询条件 }， { 要修改的值 }), 更新查询结果中的第一条数据
 *      updateMany(({ 查询条件 }， { 要修改的值 }), 批量更新
 */
// Course.updateOne({ name: 'JS 高级程序' }, { name: 'Node实战' })
// .then(res => {
//     console.log('修改数据库数据：', res)
// })

// Course.updateMany({ }, { name: 'Node实战2222' })
// .then(res => {
//     console.log('修改数据库数据：', res)
// })

/**
 * 9 集合关联：通过主键、外键进行关联查询
 */
const userSchema = new mongoose.Schema({
    name: { type: String }
})
const articleSchema = new mongoose.Schema({
    title: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const User = mongoose.model('User', userSchema)
const Article = mongoose.model('Article', articleSchema)

// User.create({ name: 'KaSong' })
// Article.create({ title: 'React从入门到放弃', author: '61614ba2f10471590795a3b1' }) // author就是用户ID，但是需要先等User创建成功

Article.find().populate('author') // 联合查询，会找到author存储的信息对象，补充到返回结果中
    .then(res => {
        console.log('关联查询：', res)
    })
