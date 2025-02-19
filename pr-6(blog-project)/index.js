// Step 1: Import required modules
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");

// Step 2: Initialize Express and set the port
const app = express();
const port = 8080;

// Step 3: Connect to the database
connectDB();

// Step 4: Set the view engine to EJS
app.set("view engine", "ejs");

// Step 5: Define the views directory explicitly
app.set("views", path.join(__dirname, "views"));

// Step 6: Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use `extended: true` for parsing nested objects
app.use(express.json());

// Step 7: Passport.js authentication setup
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

// Step 8: Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Step 9: Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Step 10: Define routes
app.use("/", require("./routes/indexRoutes"));

// Step 11: Start the server
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    }
    console.log(`Server is running on port ${port}`);
});
