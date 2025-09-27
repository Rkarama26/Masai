const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


app.get("/users/get", (req, res) => {
    const user = {
        id: 1,
        name: "Rohit",
        email: "rohit@example.com",
        age: 22
    };

    res.json(user);
});

//list of users
app.get("/users/list", (req, res) => {
    const filePath = path.join(__dirname, "db.json"); // your file

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read database file" });
        }
        try {
            const users = JSON.parse(data); // parse JSON from file
            res.json(users); // send back JSON response
        } catch (parseError) {
            res.status(500).json({ error: "Invalid JSON format in file" });
        }
    });
});


app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
