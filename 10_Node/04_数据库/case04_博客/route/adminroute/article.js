// 解析表单，支持get,posr请求，参数解析，文件上传等
const formidable = require('formidable')
const pagination = require('mongoose-sex-page')
const path = require('path')
const { Article } = require('../../model/article')

const articlePage = async(req, res) => {
     // 接收分页参数
     const page = req.query.page || 1

    let articles = await pagination(Article).find().populate('author').page(page).size(2).display(3).exec();

    // 先stringify后parse: 是因为栈溢出了。因为联合查询出来的数据会有很多其他的隐藏内容，这个内容对art-template来说太庞大了，无法正常渲染
    // 所以会提示栈溢出，这样经过处理，能够去除不必要的隐藏内容，从而正常渲染数据
    articles = JSON.parse(JSON.stringify(articles))

    res.render('admin/article', {
        articles
    })
}

const articleEditPage = async(req, res) => {
    const id = req.query.id
    if(id) {
        res.render('admin/article-edit', {
            articleId: id
        })
    } else {
        res.render('admin/article-edit', {})
    }
}

// 新增、编辑的处理函数
const addOrModifyArticle = async(req, res) => {
    const id = req.query.id

    // 1、创建表单解析对象
    const form =  formidable({ multiples: true, keepExtensions: true, uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads')})

    // 2、指定存储服务器文件夹位置：把客户端上传的文件存放到public/uploads下面 老写法
    // form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')

    // 3、保留上传文件的后缀，默认是不保留的 老写法
    // form.keepExtensions = true

    // 4、解析表单, 包括上传的字段和文件
    form.parse(req, async(err, fields, files) => {

        // console.log(111, fields, err)
        // console.log(222, files)
        // console.log(333, req)

        // 数据要存储到数据库中，注意文件资源的路径处理, 绝对路径处理为相对路径
        const filePath = files.cover.path.split('public')[1]
        await Article.create({
            ...fields,
            cover: filePath
        })
        res.redict('/admin/article')
    })
}

module.exports = {
    articlePage,
    articleEditPage,
    addOrModifyArticle
}