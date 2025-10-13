
const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const userRouter = require('./routes/user.routes');
const serviceRouter = require('./routes/service.routes');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001

app.use(express.json());

connectToDB()


//routes
app.use("/user", userRouter)
app.use("/bookings", serviceRouter)  


app.use("/test", (req, res) => {
    try {
        res.status(200).json({ message: "this is test route" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
})

app.use((req, res) => {
    res.status(200).json({ message: "This request is nudefined" })
})


app.listen(PORT, () => {
    console.log("server is runnig on port 3000")
})