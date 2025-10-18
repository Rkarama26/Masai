const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const userRouter = require('./routes/user.routes');
const movieRouter = require('./routes/movie.Routes');
const ReviewModel = require('./models/review.model');
const reviewRouter = require('./routes/review.Routes');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const morgan = require("morgan");
require('dotenv').config()

const app = express();
// internal
app.use(express.json())
app.use(loggerMiddleware);

//external 
app.use(morgan("dev")); //it is responsible for logs method, url, status, res-time

connectToDB()



//routes
app.use("/", userRouter)
app.use("/movie", movieRouter)
app.use("/review", reviewRouter)


app.use("/test", (req, res) => {
    try {
        res.status(200).json({ message: "this is test routes" })
    } catch (error) {
        res.status(500).json({ error: "someting went wrong" });
    }
})

app.use(() => {
    console.log("this request is nudefined")
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})