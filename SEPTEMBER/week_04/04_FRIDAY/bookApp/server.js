const express = require('express');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const adminRouter = require('./routes/adminRoutes');
const readerRouter = require('./routes/readerRoutes');

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/admin/books", adminRouter);
app.use("/reader", readerRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
