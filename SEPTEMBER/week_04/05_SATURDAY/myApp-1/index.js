const express = require("express");
const apiRouter = require("./routes/api");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Mount API routes
app.use("/api", apiRouter);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
