const { Article } = require('../model/article')
const pagination = require('mongoose-sex-page')

const homePage = async(req, res) => {
    // 接收分页参数
    const page = req.query.page || 1

    let articles = await pagination(Article).find().populate('author').page(1).size(2).display(3).exec();
    articles = JSON.parse(JSON.stringify(articles))

    console.log(articles)
    res.render('home/default', {
        articles
    })
}

module.exports = {
    homePage
}