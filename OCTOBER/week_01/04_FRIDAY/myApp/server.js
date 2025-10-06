const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./profileRoutes");

const app = express();
app.use(express.json());

// MongoDB 
async function connectToDB() {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/oneToOne")
        console.log("connected to db")
    } catch (error) {
        console.log("error while connecting", error)
    }
}

// Routes
app.use("/", userRoutes);
app.use("/", profileRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
