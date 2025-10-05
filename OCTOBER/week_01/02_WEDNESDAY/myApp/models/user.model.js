const mongoose = require('mongoose');

//address
const addressSchema = new mongoose.Schema({
    houseNo: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
})

// user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 1, max: 120 },
    gender: { type: String, enum: ["male", "female"] },
    //orders - embeded-document
    //  1 to many relationship 
    address: [addressSchema],
})




const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel