const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const saltRounds = 10;
const passport = require('passport');
const GitHubStrategy = require('passport-github2')
require("dotenv").config() 

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
                    // in token userid and role is encoded 
                    var token = jwt.sign({ userId: user._id, role: user.role },
                        process.env.JWT_SECRET_KEY, { expiresIn: 20 });

                    // console.log(token)
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


//github Oauth 
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        console.log("profile from github: ", profile)
        return done(null, profile)
    }
));

// calls githu login and auth page
userRouter.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

// call back routes 
userRouter.get('/auth/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    async function (req, res) {
        // Successful authentication, redirect home.
        // res.redirect('/');
        const githubUserId = req.user.id
        const user = await UserModel.findOne({ profileId: githubUserId })
        if (!user) {
            // if user not found create new user and store them in db
            let newUser = await UserModel.create({ profileId: githubUserId })
            var token = jwt.sign({ userId: newUser._id, role: newUser.role },
                process.env.JWT_SECRET_KEY);

            res.json({ message: " new user Login Successful", token });
        }
        else {
            // if user found, directly send a token 
            var token = jwt.sign({ userId: user._id, role: user.role },
                process.env.JWT_SECRET_KEY);
            res.status(201).json({ message: "Existing User Login Successful", token })
        }
    });


module.exports = userRouter;