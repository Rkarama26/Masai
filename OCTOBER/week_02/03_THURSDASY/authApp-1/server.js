

const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const userRouter = require('./routes/user.routes');
const todoRouter = require('./routes/todo.routes');
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;


connectToDB()
app.use(express.json());

app.use("/user", userRouter)
app.use("/todo", todoRouter)


app.get("/test", (req, res) => {
    try {
        res.status(200).json({ msg: "this is test route" })
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})
app.get("/login", (req, res) => {
    try {
        res.status(200).json({ msg: "please login first" })
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})

app.use((req, res) => {
    try {
        res.status(200).json({ msg: "this request is nudefined" })
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})

app.listen(PORT, () => {
    console.log("server running on port 3000")
})

