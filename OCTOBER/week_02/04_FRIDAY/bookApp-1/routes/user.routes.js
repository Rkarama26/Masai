const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();
const UserModel = require("../models/user.model");
const redis = require("../configs/redis.config");


// In-memory refresh token store
let refreshTokens = [];

//  SIGNUP 
userRouter.post("/signup", (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) return res.status(500).json({ message: "Something went wrong" });

            await UserModel.create({ username, email, password: hash, role });
            res.status(201).json({ message: "Signup Success" });
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

//  LOGIN 
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found, please signup" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json({ message: "Wrong Password" });

        // Access Token (15–20 min)
        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' } // 24h 
        );

        // Refresh Token (7 days)
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // store refresh token
        refreshTokens.push(refreshToken);

        const userNamespace = `user:${user.id}`;
        await redis.hmset(`${userNamespace}:session`, {
            accessToken,
            refreshToken,
            lastLogin: new Date().toISOString()
        });


        res.status(200).json({
            message: "Login Success",
            accessToken,
            refreshToken,
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

//  REFRESH TOKEN 
userRouter.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: "Invalid refresh token" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // ✅ fetch user from DB to get current role
        const user = await UserModel.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // ✅ generate new access token including role
        const newAccessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' } // 15 minutes
        );

        res.json({
            message: "New access token issued",
            accessToken: newAccessToken,
        });
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

//  LOGOUT 
userRouter.post("/logout", (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.json({ message: "Logged out successfully" });
});


module.exports = userRouter;