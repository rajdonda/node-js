const express = require('express');
const multer = require('multer');


const { LoginPage, RegisterPage, DashboardPage, registerUser, loginUser, Logout } = require('../controllers/Authcontroller');
const { AddBlog, insertBlog, deleteBlog, editBlog, UpdateBlog, readmore  } = require('../controllers/CrudController');

const routes = express.Router();

const passport = require('passport');


const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('image');


routes.get('/', LoginPage);
routes.get('/register', RegisterPage);
routes.get('/dashboard', DashboardPage);
routes.post('/registerUser' , registerUser);
routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/' }), loginUser);
routes.post('/logout', Logout);


routes.get('/add', AddBlog);
routes.post('/insertblog', fileupload, insertBlog);
routes.get('/deleteblog',  deleteBlog);
routes.get('/editblog', editBlog);
routes.post('/Updateblog', fileupload, UpdateBlog);
routes.get('/readmore', readmore);

module.exports = routes;
