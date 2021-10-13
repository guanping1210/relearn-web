const mongoose = require('mongoose')

const articleSehema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        require: [true, '请填写标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请填写作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})

const Article = mongoose.model('Article', articleSehema)

module.exports = {
    Article
}