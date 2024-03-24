const userModel = require('../database/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.signupUser = (req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { username,email, password } = req.body;
        
        userModel.getOne({ email: email }, (err, result) => {
            if (result) {
              console.log(result);
              // found a match, return to login with error
              req.flash('error_msg', 'User already exists. Please login.');
              res.redirect('/login');
            } else {
                const saltRounds = 10;

                // Hash password
                bcrypt.hash(password, saltRounds, (err, hashed) => {
                    // TODO: NEED TO UPDATE SIGNUP PAGE FIELDS AND USER FIELDS 
                    // follow below vvv
                  const newUser = {
                    userId: 10005,
                    username: username,
                    name: name,
                    password: password,
                    profilePicture:'/images/user3.jpg',    
                    description: 'I am new to this forum. Nice to meet you all! :) ',
                    upvotes: [],
                    downvotes: [],
                    dateCreated: date,
                    email: email,
                    password: hashed
                  };
                
                  userModel.create(newUser, (err, user) => {
                    if (err) {
                      req.flash('error_msg', 'Could not create user. Please try again.');
                      res.redirect('/signup');
                      // res.status(500).send({ message: "Could not create user"});
                    } else {
                      req.flash('success_msg', 'You are now registered! Login below.');
                      res.redirect('/login');
                    }
                  });
                });
            }
          });
    } else {
        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));
        res.redirect('/signup');
    }
};

exports.loginUser = (req, res) => {





    res.redirect('/');
};

exports.logoutUser = (req, res) => {




    res.redirect('/login');
};

