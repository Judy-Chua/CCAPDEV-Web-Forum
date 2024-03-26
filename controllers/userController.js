const userModel = require('../database/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


// TODO: move instantiation of default users to index page
exports.signupUser = (req, res) => {
  const saltRounds1 = 10;

  // Hash password (for default users, all have 123456 as password)
  bcrypt.hash('123456', saltRounds1, (err, hashed) => {

    // console.log('Hashing password ...');
    const user1 = {
      userId: 10000,
      username: '0',
      name: '',
      password: hashed,
      profilePicture:'/images/user-icon.jpg',    
      description: 'I am new to this forum. Nice to meet you all! :) ',
      upvotes: [],
      downvotes: [], 
      email: 'default@gmail.com'
    };

    userModel.getOne({ email: user1.email }, (err, result) => {
      if (result) {
        console.log(user1.username + " already exists.");
      } else {
        userModel.create(user1, (err, user) => {
        // console.log("Creating user ...");
        if (err) {
          console.log("Error creating " + user1.username + "...");
        } else {
          console.log(user1.username + " successfully created.")
        }
      });
    }});

    const user2 = {
      userId: 10001,
      username: 'Adri20',
      name: 'Adriel Manuel',
      password: hashed,
      profilePicture:'/images/user1.jpg',
      description:'I am an undergraduate student in De La Salle University, taking a Computer Science degree focusing on software technology.',
      upvotes: [],
      downvotes: [],
      email: 'adri20@gmail.com'
    };

    userModel.getOne({ email: user2.email }, (err, result) => {
      if (result) {
        console.log(user2.username + " already exists.");
      } else {
        userModel.create(user2, (err, user) => {
        // console.log("Creating user ...");
        if (err) {
          console.log("Error creating " + user2.username + "...");
        } else {
          console.log(user2.username + " successfully created.")
        }
      });
    }});

    const user3 = {
      userId: 10002,
      username: 'Clarisse35',
      name: 'Clarissa Albarracin',
      password: hashed,
      profilePicture:'/images/user2.jpg',    
      description:'I am a dog enthusiast! I love playing dog games!',
      upvotes: [],
      downvotes: [],
      email:'clarisse35@gmail.com'
    };

    userModel.getOne({ email: user3.email }, (err, result) => {
      if (result) {
        console.log(user3.username + " already exists.");
      } else {
        userModel.create(user3, (err, user) => {
        // console.log("Creating user ...");
        if (err) {
          console.log("Error creating " + user3.username + "...");
        } else {
          console.log(user3.username + " successfully created.")
        }
      });
    }});

    const user4 = {
      userId: 10003,
      username: 'Judy89',
      name: 'Judy Chua',
      password: hashed,
      profilePicture:'/images/user3.jpg',    
      description:'I am new to this forum. Nice to meet you all! :) ',
      upvotes: [],
      downvotes: [],
      email: 'judy89@gmail.com'
    };

    userModel.getOne({ email: user4.email }, (err, result) => {
      if (result) {
        console.log(user4.username + " already exists.");
      } else {
        userModel.create(user4, (err, user) => {
        // console.log("Creating user ...");
        if (err) {
          console.log("Error creating " + user4.username + "...");
        } else {
          console.log(user4.username + " successfully created.")
        }
      });
    }});

  });

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      console.log("No errors detected ...");
      const { username, name, email, pwd1, pwd2 } = req.body;
      // console.log(username);
        
      // TODO: replace this with email
      userModel.getOne({ email: email }, (err, result) => {
          if (result) {
            console.log(result);
            // found a match, return to login with error
            req.flash('error_msg', 'User already exists. Please login.');
            res.redirect('/login');
          } else {
            // find last userId
              const saltRounds = 10;

              // Hash password
              bcrypt.hash(pwd1, saltRounds, (err, hashed) => {

                console.log('Hashing password ...');
                const newUser = {
                  userId: 100005,
                  username: username,
                  name: 'Sample Name Here',
                  password: hashed,
                  profilePicture:'/images/user3.jpg',    
                  description: 'I am new to this forum. Nice to meet you all! :) ',
                  upvotes: [],
                  downvotes: [], 
                  email: email
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

