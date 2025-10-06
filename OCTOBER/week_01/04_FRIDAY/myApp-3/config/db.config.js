

const mongoose = require('mongoose');

const connectToDB = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/manyToMany2")
        console.log("connected to db")
    } catch (error) {
        console.log("failed to connect db")
    }
}

module.exports = connectToDB;