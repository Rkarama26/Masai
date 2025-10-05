// step 1 start server
// step 2 connect to db
// step 3 setup the model and schema
// step 4 create routes

const express = require('express');
const connectToDB = require('./configs/mongodb.config');
const UserRouter = require('./routes/user.routes');
const OrderRouter = require('./routes/order.routes');
const app = express()
app.use(express.json()) // body parse middleware

connectToDB()

//routes
app.use("/user", UserRouter);
app.use("/order", OrderRouter);

//  test route 
app.get("/test", (req, res) => {
    res.status(200).json({ msg: "This is test route" })
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})