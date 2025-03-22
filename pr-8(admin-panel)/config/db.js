const mongoose = require("mongoose");
const link = "mongodb://0.0.0.0:27017/exam2025";

const connectDb = async () => {
    try {
        await mongoose.connect(link)
        console.log("Database is successfully connected.");
    }
    catch (err) {
        console.log(err);
        return false

    }
}
module.exports = connectDb;