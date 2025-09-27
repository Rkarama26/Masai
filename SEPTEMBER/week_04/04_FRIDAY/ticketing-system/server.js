const express = require("express");
const bodyParser = require("body-parser");
const ticketRoutes = require("./routes/ticketRoutes");


const app = express()

const PORT = 3000;

app.use(bodyParser.json())


// Routes
app.use("/tickets", ticketRoutes);

// other routes Handler
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});


app.listen(PORT, () => {
    console.log("Server is running at 3000")
})