const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    commentId: Number,
    userId: Number,
    theComment: String,
    upvotes: [],
    downvotes: [],
    date: Date,
    popVal: Number
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment