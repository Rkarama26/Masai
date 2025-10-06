const express = require('express');
const connectToDB = require('./configs/db.config');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const app = express()
app.use(express.json())


connectToDB()

app.use('/user', userRoutes)
app.use('/book', bookRoutes)

app.listen(3000, () => {
    console.log("server is running on port 3000")
});
