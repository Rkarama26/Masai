const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const userRouter = require('./routes/user.routes');
const dishRouter = require('./routes/dish.routes');
const orderRouter = require('./routes/order.routes');
require("dotenv").config();
const swaggerSetup = require('./configs/swagger');

const app = express();
app.use(express.json())
connectToDB()



app.use("/user", userRouter);
app.use("/dish", dishRouter);
app.use("/order", orderRouter);

swaggerSetup(app);


app.get("/test", (req, res) => {
    try {
        res.status(200).json({ message: "This is test route" })
    } catch (error) {
        res.status(200).json({ error: "something went wrong, Please try again later" })

    }
})




app.use((req, res) => {
    console.log("this request is not defined")
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})





