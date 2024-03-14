const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    postId: Number,
    postUser: Number,
    title: String,
    description: String,
    comments:[],
    image: String,
    tag: [],
    upvotes: [],
    downvotes: [],
    votes: Number,
    popVal: Number,
    trendVal: Number,
    controVal: Number,
    date: Date,
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post