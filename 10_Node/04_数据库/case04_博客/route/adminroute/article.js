// 解析表单，支持get,posr请求，参数解析，文件上传等
const formidable = require('formidable')
const { Article } = require('../../model/article')

const articlePage = async(req, res) => {
    res.render('admin/article')
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

    if(id) {} else {}
}

module.exports = {
    articlePage,
    articleEditPage
}