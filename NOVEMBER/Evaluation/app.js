const express = require('express');
const connectToDB = require('./config/db');
const userRouter = require('./routes/auth.routes');
const ticketRouter = require('./routes/ticket.routes');
const eventRouter = require('./routes/event.routes');
const adminRouter = require('./routes/admin.routes');


const app = express();


require("dotenv").config()
const PORT = process.env.PORT || 5000;

connectToDB();

app.use(express.json());


app.use("/api/auth", userRouter)
app.use("/api/tickets", ticketRouter)
app.use("/api/events", eventRouter)
app.use("/api/admin", adminRouter)


//test route
app.get("/test", (req, res) => {
    try {
        res.status(200).json({ msg: "this is test route" })
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})
//
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
