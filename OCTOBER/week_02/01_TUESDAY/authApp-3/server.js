

const express = require('express');
const connectToDB = require('./configs/db.configs');
const userRouter = require('./routes/user.route');
const blogRouter = require('./routes/blog.route');

require("dotenv").config()
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
connectToDB()

app.use("/user", userRouter)
app.use("/blog", blogRouter)

app.use("/test", (req, res) => {
    try {
        res.status(200).json({ msg: "this is test route" })
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
    console.log("Server is running on port 3000")
})