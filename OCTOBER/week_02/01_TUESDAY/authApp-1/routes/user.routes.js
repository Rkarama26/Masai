const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const saltRounds = 10;



// siginup
// client will give username, email & password from req.body
// password must be hashed before storing in db
// npm bcrypt hepls to hash the password
userRouter.post("/signup", (req, res) => {
    try {
        const { username, email, password } = req.body;
        // hash raw pass
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                res.status(500).json({ message: "Something went wrong" });
            }
            // Store hash in your password DB.
            await UserModel.create({ username, email, password: hash })
            res.status(201).json({ message: "Signup Success" })
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
})

userRouter.post("/login", async (req, res) => {
    // email , password
    try {
        // first check if user present
        // if yes , compare password
        // if no,  res do siginup
        const { email, password } = req.body
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please signup" });
        }
        else {
            let hash = user.password // password stored in  db
            bcrypt.compare(password, hash).then(function (result) {
                console.log(result)
                if (result) {
                    // if password matched
                    var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                    console.log(token)
                    res.status(200).json({ message: "Login Success", token })
                }
                else {
                    res.status(403).json({ message: "Wrong Password" })
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})


module.exports = userRouter;