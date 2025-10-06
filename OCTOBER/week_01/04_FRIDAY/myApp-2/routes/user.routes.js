

const express = require('express');
const { addUser, getUserRentals } = require('../controllers/user.controller');
const userRoutes = express.Router();

userRoutes.post("/add-user", addUser) 
userRoutes.get("/rentals/:userId", getUserRentals) 



module.exports = userRoutes
