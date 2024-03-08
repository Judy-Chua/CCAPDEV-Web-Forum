const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    postId: Number,
    title: String,
    description: String,
    comments:[],
    image: String,
    tag: String,
    upvotes: [],
    downvotes: [],
    popVal: Number,
    trendVal: Number,
    controVal: Number,
    date: Date,
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post