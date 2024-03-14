const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: Number,
    username:String,
    name:String,
    password:String,
    profilePicture:String,
    description:String,
    upvotes: [],
    downvotes: [],
    dateCreated: Date,
})


const User = mongoose.model('User', UserSchema)

module.exports = User