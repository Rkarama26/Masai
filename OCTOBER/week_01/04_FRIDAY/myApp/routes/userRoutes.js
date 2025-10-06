const express = require("express");
const UserModel = require("../models/User");
const userRoutes = express.Router();

userRoutes.post("/add-user", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new UserModel({ name, email });
        await user.save();
        res.status(201).json({ msg: "User added", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = userRoutes;
