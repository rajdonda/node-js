const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/api/api/auth-api`);

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`database successfully connected`);
})

module.exports = db;