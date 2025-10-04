

const express = require('express');
const TaskRouter = require('./routes/taskRoutes');
const connectToDb = require('./configs/mongo.config');
const app = express();

//middleware
app.use(express.json())

connectToDb()

//test
app.get("/test", (req, res) => {
    res.status(200).json({ msg: "This is test route" })
})

app.use("/task", TaskRouter)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})







