
const express = require('express');
const UserModel = require('../models/userModel');
const router = express.Router();


router.post("/", async (req, res) => {

    try {
        console.log(req.body)
        let user = await UserModel.create(req.body);
        res.json({ msg: "added to db" })
    } catch (error) {
        res.json({ msg: "failed to add data", error: error })
    }
});


module.exports = { userRoutes: router };
