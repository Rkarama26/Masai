

const express = require('express');
const connectDB = require('./configs/db.config');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const consultationRoutes = require('./routes/consultationRoutes');

const app = express();
app.use(express.json());


connectDB() 
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/consultations', consultationRoutes);



app.listen(3000, () => {
    console.log("server is running on port 3000")
})