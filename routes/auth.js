const router = require('express').Router();
const userController = require('../controllers/userController');
const { signupValidation } = require('../views/validators.js');

// GET login to display login page
router.get('/login', (req, res) => {
    res.render('login-page', {
        pageTitle: 'Login'
    });
});

// GET signup to display signup page
router.get('/signup', (req, res) => {
    res.render('signup-page', {
        pageTitle: 'Sign Up'
    });
});

// POST methods for form submissions
router.post('/signup', signupValidation, userController.signupUser);
router.post('/login', userController.loginUser);

// logout
router.get('/logout', userController.logoutUser);

module.exports = router;
