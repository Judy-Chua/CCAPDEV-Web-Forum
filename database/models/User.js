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
    dateCreated: {
        type: Date,
        default: Date.now
    },
    email: String
});

const User = mongoose.model('User', UserSchema)

module.exports = {
    User: User,
    create: function(obj, next) {
        const user = new User(obj);
        
        user.save()
            .then(savedUser => {
                next(null, savedUser);
            })
            .catch(err => {
                console.error('Error in user save:', err);
                next(err, null);
            });
    },
    getById: function(id, next) {
        User.findById(id)
            .then(user => {
                next(null, user);
            })
            .catch(err => {
                next(err, null);
            });
    },
    getOne: function(query, next) {
        User.findOne(query)
            .then(user => {
                next(null, user);
            })
            .catch(err => {
                next(err, null);
            });
    }    
};

