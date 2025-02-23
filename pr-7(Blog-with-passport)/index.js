const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8080;

// Step 1: Connect to the database
connectDB();

// Step 2: Set the view engine to EJS
app.set("view engine", "ejs");

// Step 3: Define the views directory explicitly
app.set("views", path.join(__dirname, "views"));

// Step 4: Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use `extended: true` for parsing nested objects
app.use(express.json());

// Step 5: Authentication start with passportjs
const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
app.use(session({
    secret: 'rnw4123',
    name: 'mahadev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
// Step 6: Authentication end with passportjs

// Step 7: Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Step 8: Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Step 9: Define routes
app.use("/", require("./routes/indexRoutes"));

// Step 10: Start the server
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    }
    console.log(`Server is running on port ${port}`);
});
