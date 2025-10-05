

const express = require('express');
const connectToDB = require('./configs/db.config');
const UserRouter = require('./routes/user.routes');

const app = express();

connectToDB();

//middleware
app.use(express.json())


app.use("/user", UserRouter);





app.listen(3000, () => {
    console.log("Server running on port 3000")
})