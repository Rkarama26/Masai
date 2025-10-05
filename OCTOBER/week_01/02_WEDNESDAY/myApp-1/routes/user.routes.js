
const express = require('express');
const { getUsers, addUser, addProfile, searchByQuery, updateProfile, deleteprofile } = require('../controllers/user.controller');

const UserRouter = express.Router();

UserRouter.get("/", getUsers)

UserRouter.post("/add", addUser)

UserRouter.post("/add-profile/:userId", addProfile)

UserRouter.get("/profile", searchByQuery)

UserRouter.put('/update-profile/:userId/:profileName', updateProfile)

UserRouter.delete('/delete-profile/:userId/:profileName', deleteprofile)

module.exports = UserRouter