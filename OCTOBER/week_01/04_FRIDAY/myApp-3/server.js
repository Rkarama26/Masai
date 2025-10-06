

const express = require('express');
const connectToDB = require('./config/db.config');
const bookRouter = require('./routes/book.route');
const memeberRouter = require('./routes/member.route');
const app = express()
app.use(express.json())

connectToDB() 

app.use("/book", bookRouter)
app.use("/member", memeberRouter)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})