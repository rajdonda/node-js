const User = require('../models/User');
const passport = require('passport');

exports.getRegister = (req, res) => {
    res.render('auth/register');
};

exports.postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user) {
            req.flash('error_msg', 'Email already registered');
            return res.redirect('/register');
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        
        req.flash('success_msg', 'You are now registered');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
};

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login');
    });
};