

const mongoose = require('mongoose')
const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/testDB")
         console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectToDB};
