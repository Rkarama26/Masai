

const express = require('express');
const app = express();
app.use(express.json())


app.get("/", (req, res) => {
    res.send("This is home route")
})

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);



app.listen(3000, () => {
    console.log("Listening on port 3000")
})