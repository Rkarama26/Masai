

const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const userRouter = require('./routes/user.routes');
const subscritionRouter = require('./routes/subscription.routes');
const contentRouter = require('./routes/content.routes');
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;


app.use(express.json());

connectToDB()

app.use("/user", userRouter)
app.use("/", subscritionRouter)
app.use("/content", contentRouter)



app.get("/test", (req, res) => {
    try {
        res.status(200).json({ msg: "this is test route" })
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})

app.use((req, res) => {
    res.status(200).json({ msg: "this request is nudefined" })
})

app.listen(PORT, () => {
    console.log("server running on port 3000")
})

