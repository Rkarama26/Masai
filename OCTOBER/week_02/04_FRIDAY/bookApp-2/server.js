

const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/book.routes');
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;


app.use(express.json())
connectToDB()

app.use("/", userRouter) 
app.use("/book", bookRouter) 

app.use("/test", (req, res) => {
    try {
        res.status(200).json({ message: "this is test routes" })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
})

app.use((req, res) => {
    console.log("This request is undefined")
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})