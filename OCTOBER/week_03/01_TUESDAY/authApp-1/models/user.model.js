
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    profileId: { type: Number }
})  
 
const UserModel = new mongoose.model("User", userSchema);
module.exports = UserModel; 