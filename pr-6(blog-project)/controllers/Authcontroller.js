const UserModel = require('../models/authModel');
const BlogModel = require('../models/crudModel');

const LoginPage = (req, res) => {
    if (req.cookies['auth']) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
};

const RegisterPage = (req, res) => {
    return res.render('register');
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: password // Storing plaintext password (not recommended)
        });
        console.log("You’ve successfully created your account. Please log in to continue.");
        return res.redirect('/');
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send("Error registering user");
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user || user.password !== password) {
            console.log("Account not found. Please register to create a new account.");
            return res.redirect('/');
        }
        // Store user information in a cookie
        res.cookie('auth', JSON.stringify({ id: user._id, name: user.name }), { httpOnly: true });
        console.log("Login successful! Redirecting to your dashboard.");
        return res.redirect('/dashboard');
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).send("Error logging in");
    }
};

const DashboardPage = async (req, res) => {
    const authCookie = req.cookies['auth'];
    if (!authCookie) {
        return res.redirect('/');
    }
    try {
        const user = JSON.parse(authCookie);
        const blogs = await BlogModel.find();
        res.render('dashboard', { blogs: blogs, user }); 
    } catch (error) {
        console.error("Error fetching dashboard or parsing auth cookie:", error);
        return res.redirect('/');
    }
};

const Logout = (req, res) => {
    res.clearCookie('auth');
    console.log("You’re now logged out. Thanks for visiting.");
    return res.redirect('/');
};

module.exports = {
    LoginPage,
    RegisterPage,
    DashboardPage,
    registerUser,
    loginUser,
    Logout
};
