const express = require('express');
const router = express.Router();
const passport = require('passport'); // Add this line
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// Home page
router.get('/', (req, res) => {
    res.render('index');
});

// Login page
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('auth/login');
});

// Register page
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('auth/register');
});

// Register handle
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const User = require('../models/User');
        const user = new User({ name, email, password });
        await user.save();
        req.flash('success_msg', 'You are now registered');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
});

// Login handle
router.post('/login', passport.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout handle
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login');
    });
});

module.exports = router;