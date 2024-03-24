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

module.exports = {
    User: User,
    create: function(obj, next) {
        const user = new User(obj);
      
        user.save(function(err, user) {
            next(err, user);
        });
    },
    getById: function(id, next) {
        User.findById(id, function(err, user) {
            next(err, user);
        });
    },
    getOne: async function(query) {
        try {
            const user = await User.findOne(query);
            return user;
        } catch (err) {
            throw err;
        }
    }    
};