
const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/manyToMany")
        console.log("connected to db")
    } catch (error) {
        console.log("error while connecting", error)
    }
}

module.exports = connectToDB