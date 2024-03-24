const { body } = require('express-validator');

const signupValidation = [
    // username should not be empty
    body('username').not().isEmpty().withMessage("Username is required."),

    // Email should not be empty and must be a valid email
    body('email').not().isEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email."),

    // Password needs to be min 6 chars
    body('pwd1').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

    // Confirm password needs to be min 6 chars and must match previous pwd1
    body('pwd2').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    .custom((value, { req }) => {
        if (value !== req.body.pwd1) {
            throw new Error("Passwords must match.");
        }
        return true;
    })
];

module.exports = { signupValidation };