const userModel = require('../database/models/User');
const { validationResult } = require('express-validator');

exports.signupUser = (req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const {username, email, pwd1} = req.body;
        
        // Next items go here...
        // This line can be deleted in the next step
        // Adding it so that the error validation can be tested.
        res.redirect('/login');
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

