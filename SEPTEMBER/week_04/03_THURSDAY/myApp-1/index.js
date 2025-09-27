

const express = require('express');

const app = express();

app.get("/home", (req, res) => {
    res.send("Welcome to home page");
})

app.use(express.json())
app.get("/aboutus", (req, res) => {
    res.json("message: welcome to about");
})

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found", message: "The requested route does not exist." });
});

app.listen("3001", () => {
    console.log("the server started")
})