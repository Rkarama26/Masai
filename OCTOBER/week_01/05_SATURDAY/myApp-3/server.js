

const express = require('express');
const connectDB = require('./dbconfig');
const mentorRoutes = require('./routes/mentorRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
app.use(express.json())

connectDB();

app.use('/mentors', mentorRoutes);
app.use('/learners', learnerRoutes);
app.use('/sessions', sessionRoutes);



app.listen(3000, () => {
    console.log("server is running on port 3000")
})