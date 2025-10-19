const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
 
const saltRounds = 10;

// Signup route
authRouter.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //  if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //  if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please login" });
        }

        // Hash 
        const hash = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = await UserModel.create({ username, email, password: hash });

        res.status(201).json({ message: "Signup Success", userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// Login route
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please signup" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(403).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" } 
        );

        res.status(200).json({ message: "Login Success", token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

module.exports = authRouter;
