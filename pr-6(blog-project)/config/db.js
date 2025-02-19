const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        let db = mongoose.connect('mongodb://127.0.0.1:27017/Blog_PR_DB');
        console.log('MongoDB Connected...');
    }catch(err){
        console.error(err);
        return false;
    }
}

module.exports = connectDB;