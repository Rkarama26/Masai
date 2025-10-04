

const express = require('express');
const connectToDB = require('./config/db');
const bookRouter = require('./routes/library.routes');

const app = express();

app.use(express.json());
connectToDB()

app.use("/book", bookRouter)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})