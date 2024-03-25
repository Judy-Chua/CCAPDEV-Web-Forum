const userModel = require('../database/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.signupUser = (req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      console.log("No errors detected ...");
        const { username, email, pwd1, pwd2 } = req.body;
        // console.log(username);
        
        userModel.getOne({ username: username }, (err, result) => {
            if (result) {
              console.log(result);
              // found a match, return to login with error
              req.flash('error_msg', 'User already exists. Please login.');
              res.redirect('/login');
            } else {
                const saltRounds = 10;

                // Hash password
                bcrypt.hash(pwd1, saltRounds, (err, hashed) => {

                  console.log('Hashing password ...');
                    // TODO: NEED TO UPDATE SIGNUP PAGE FIELDS AND USER FIELDS 
                    // follow below vvv
                  const newUser = {
                    userId: 10005,
                    username: username,
                    name: 'Sample Name Here',
                    password: hashed,
                    profilePicture:'/images/user3.jpg',    
                    description: 'I am new to this forum. Nice to meet you all! :) ',
                    upvotes: [],
                    downvotes: []
                  };

                  userModel.create(newUser, (err, user) => {
                    console.log("Creating user ...");
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
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    console.log("No errors detected ...");
    const { username, pwd } = req.body;
  
    // Next items go here... Same as before, this will be replaced.
    res.redirect('/');
  } else {
    const messages = errors.array().map((item) => item.msg);
  
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {




    res.redirect('/login');
};

