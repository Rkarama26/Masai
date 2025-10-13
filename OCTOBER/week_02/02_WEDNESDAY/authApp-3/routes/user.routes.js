const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const UserModel = require("../models/user.model");
require("dotenv").config()


let refreshTokens = [];

// siginup
// client will give username, email & password from req.body
// password must be hashed before storing in db
// npm bcrypt hepls to hash the password
userRouter.post("/signup", (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // included the role in body
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                res.status(500).json({ message: "Something went wrong" });
            }
            await UserModel.create({ username, email, password: hash, role })
            res.status(201).json({ message: "Signup Success" })
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
})

userRouter.post("/login", async (req, res) => {
    // email , password
    try {
        // if yes , compare password
        // if no,  res do siginup
        const { email, password } = req.body
        let user = await UserModel.findOne({ email });
        // first check if user present
        if (!user) {
            return res.status(404).json({ message: "User not found, please signup" });
        }
        //compare password
        bcrypt.compare(password, user.password).then(function (result) {
            // console.log(result)
            if (result) {

                const accessToken = jwt.sign({ userId: user._id, role: user.role },
                    process.env.JWT_SECRET_KEY, { expiresIn: 15 * 60 }); // 15 minutes

                const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET,
                    { expiresIn: '7d' } // 7 days
                )
                refreshTokens.push(refreshToken);
                res.status(200).json({ message: "Login Success", accessToken, refreshToken })
            }
            else {
                res.status(403).json({ message: "Wrong Password" })
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})


userRouter.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: "Invalid refresh token" });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (!decoded) { return res.status(403).json({ error: "Invalid token" }); }

        const user = await UserModel.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate new access token +role + userId
        const newAccessToken = jwt.sign(
            { userId: decoded.userId, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 15 } // 15 minutes
        );

        res.json({
            message: "New access token issued",
            accessToken: newAccessToken,
        });

    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });

    }
});

// logout and remove the refresh token 
userRouter.post("/logout", (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.json({ message: "Logged out successfully" });
});

 
module.exports = userRouter;