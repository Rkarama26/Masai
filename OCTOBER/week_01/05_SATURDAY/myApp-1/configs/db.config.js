
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();


const connectToDB = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/students");
        console.log("conneted to db")
    } catch (error) {
        console.log("Failed to connect to db", error)
    }
}
module.exports = connectToDB;