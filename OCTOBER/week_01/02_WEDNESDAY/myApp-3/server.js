

const express = require('express');
const connectDB = require('./configs/db.config');
const errorHandler = require('./middleware/errorHandler');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(express.json())



app.use(errorHandler)
connectDB()

app.use('/vehicles', vehicleRoutes);


app.listen(3000, () => {
    console.log("server running on port 3000")
})