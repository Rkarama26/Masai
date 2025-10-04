
const express = require('express')
const mongoose = require('mongoose')
const { connectToDB } = require("./configs/mongodb.config.js"); // correct path
const { userRoutes } = require('./routes/userRoutes.js');

const app = express();
connectToDB()

app.use(express.json());
app.use("/users", userRoutes)




app.listen(3000, () => {
    console.log("app is istening on port 3000")
})