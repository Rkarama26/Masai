const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware.js");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware); // logs every request

// Mount employee routes
app.use("/employees", employeeRoutes);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    console.log(` Employee Management API running on http://localhost:${PORT}`);
});
