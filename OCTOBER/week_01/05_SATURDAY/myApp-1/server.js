
const express = require('express');
const connectToDB = require('./configs/db.config');
const studentRouter = require('./routes/studentRoutes');
const courseRouter = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollmentRoutes');
const app = express()

app.use(express.json())
connectToDB()

app.use("/student", studentRouter)
app.use("/course", courseRouter)
app.use("/enroll", enrollRoutes)


app.listen(3000, () => {
    console.log("server is running on port ")
})