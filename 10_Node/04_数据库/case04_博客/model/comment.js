// 评论
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    time: {
        type: Date,
        defualt: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
    Comment,
}