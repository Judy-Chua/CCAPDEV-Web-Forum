const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    username:String,
    name:String,
    password:String,
    profilePicture:String,
    desc:String,
    isLoggedIn: String,
    upvotes: [],
    downvotes: [],
    dateCreated: Date,
})


const User = mongoose.model('User', UserSchema)

module.exports = User