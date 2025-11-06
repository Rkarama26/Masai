const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = new mongoose.model("User", userSchema);
module.exports = UserModel;
