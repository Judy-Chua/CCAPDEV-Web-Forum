const userModel = require('../database/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.signupUser = (req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      console.log("No errors detected ...");
      const { username, email, pwd1, pwd2 } = req.body;
      // console.log(username);
        
      // TODO: replace this with email
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
                    req.flash('success_msg', 'You are now signed up! Login below.');
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
  
    // TODO: replace this with email
    userModel.getOne({ username: username }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) {
          // authenticate user

          // Check password with hashed value in the database
          bcrypt.compare(password, user.password, (err, result) => {
            // passwords match (result == true)
            if (result) {
              // Update session object once matched!
              req.session.user = user._id;
              req.session.name = user.name;

              console.log(req.session);
              res.redirect('/');
            } else {
              // passwords don't match
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
    
          // next block of code goes here
          res.redirect('/');
        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that email. Please register.');
          res.redirect('/signup');
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
  
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {




    res.redirect('/login');
};

