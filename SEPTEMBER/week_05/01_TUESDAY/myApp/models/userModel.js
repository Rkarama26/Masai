
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // makes it mandatory
    },
    age: {
        type: Number,
        required: true,
    },
})

// model is a collection created from the Schema
const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel;

