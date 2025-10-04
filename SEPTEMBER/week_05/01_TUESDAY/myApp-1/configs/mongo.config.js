const mongoose = require('mongoose')

const connectToDb = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/taskDB")
        console.log("connecting to db")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb;
