
const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");


userRouter.post("/signup", (req, res) => {
    const { name, email, password } = req.body

    try {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(500).json({ message: "Something went wrong" });
            }
            const user = await UserModel.create({ ...req.body, password: hash });

            res.status(201).json({ message: "signup successfull" });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User not found, please signup" });
    }
    else {
        let hash = user.password // password stored in  db
        bcrypt.compare(password, hash).then(function (result) {
            if (result) {
                // if password matched
                // for generating token it needs secret key
                var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                // console.log(token)
                res.status(200).json({ message: "Login Success", token })
            }
            else {
                res.status(403).json({ message: "Wrong Password" })
            }
        });
    }


})

module.exports = userRouter;