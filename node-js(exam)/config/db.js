const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/exam2025');
        console.log('MongoDB Connected Successfully');
        return true;
    } catch(err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

module.exports = connectDB;