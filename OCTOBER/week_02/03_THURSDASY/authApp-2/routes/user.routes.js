const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const BlackListTokenModel = require("../models/blacklisttoken.model");
const sendMail = require("../utils/mailer");


// In-memory refresh token store
let refreshTokens = [];

// SIGNUP 
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Rohit
 *               email:
 *                 type: string
 *                 example: rohit@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Signup success
 *       400:
 *         description: Invalid role
 *       500:
 *         description: Server error
 */

userRouter.post("/signup", (req, res) => {
    try {
        const { username, email, password, role } = req.body;


        // Allowed roles
        const allowedRoles = ["admin", "user", "chef"];

        // Check if role is provided and valid
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({
                message: `Invalid role.}`
            });
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) return res.status(500).json({ message: "Something went wrong" });

            await UserModel.create({ username, email, password: hash, role });
            res.status(201).json({ message: "Signup Success" });
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: rohit@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Login success with access & refresh tokens
 *       403:
 *         description: Wrong password
 *       404:
 *         description: User not found
 */

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
            { expiresIn: 15 * 60 } // 15 minutes
        );

        // Refresh Token (7 days)
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // store refresh token
        refreshTokens.push(refreshToken);

        res.status(200).json({
            message: "Login Success",
            accessToken,
            refreshToken,
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

/**
 * @swagger
 * /user/refresh:
 *   post:
 *     summary: Refresh access token using a valid refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New access token issued
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Refresh token required
 *       403:
 *         description: Invalid refresh token
 *       404:
 *         description: User not found
 */

userRouter.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: "Invalid refresh token" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        //  fetch user from DB to get current role
        const user = await UserModel.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // generate new access token including role
        const newAccessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 } // 60 minutes
        );

        res.json({
            message: "New access token issued",
            accessToken: newAccessToken,
        });
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user and remove refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */

userRouter.post("/logout", (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.json({ message: "Logged out successfully" });
});

/**
 * @swagger
 * /user/forget-password:
 *   post:
 *     summary: Send password reset link
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: rohit@example.com
 *     responses:
 *       200:
 *         description: Reset link sent
 *       404:
 *         description: User not found
 */

userRouter.post("/forget-password", async (req, res) => {
    try {
        const { email } = req.body;
        let user = await UserModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found" })
        } else {
            // user found
            // need to send a reset pasword link to the mail
            // link should not be easily decodable
            // for that we can use token, let say - 
            // user/reset-passsword?token=giufkjnsvkmdfsfjsdfgj

            const resetToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: 2 * 60 } // 2 minutes
            );
            let resetPasswordLink = `http://localhost:3000/user/reset-password?token=${resetToken}`;
            const html = `
              <p>Dear ${user.username},</p>
              <p>Click the link below to reset your password. This link is valid for 2 minutes:</p>
              <a href="${resetPasswordLink}">${resetPasswordLink}</a>
                `;

            await sendMail(user.email, "Password Reset Link", html)

            res.json({
                message: "passsword reset link sent registered email",
                link: resetPasswordLink
            })

        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again" })
    }
})

//reset-password
userRouter.post("/reset-password", async (req, res) => {
    const { token } = req.query
    const { newPassword } = req.body;
    try {
        const blackListed = await BlackListTokenModel.findOne({ token })
        if (blackListed) {
            return res.status(403).json({ message: "This reset link has already been used or is invalid." });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded) {
            // token verified
            let user = await UserModel.findById(decoded.userId)
            // user.password = newPassword // raw password, it should be hashed
            // await user.save();

            bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
                if (err) return res.status(500).json({ message: "Something went wrong" });

                user.password = hash // hashed password
                await user.save();
                // after pass-reset, blacklist the token
                await BlackListTokenModel.create({ token })
                // console.log(user);
                return res.status(201).json({ message: "Password reset successfully" });
            });

        }
    } catch (error) {
        if (error.message == "jwt expired") {
            res.status(403).json({ message: "Password reset link expired, plese click forget password again" })
        } else {
            res.status(500).json({ message: "Something went wrong, please try again later" })
        }
    }



})

module.exports = userRouter;
