const express = require("express");
const authMiddleware = require("../middleware/auth.middlware");
const redis = require("../configs/redis.config");
const BookModel = require("../models/book.model");
const cron = require("node-cron");


const bookRouter = express.Router();

/**
 * GET /books
 * List all books for the authenticated user
 */
bookRouter.get("/books", authMiddleware(["user"]), async (req, res) => {
    try {
        const userId = req.user.id;
        const redisNamespace = req.redisNamespace || `user:${userId}`;
        const redisKey = `${redisNamespace}:books`;

        // Try cache first
        const cached = await redis.get(redisKey);
        if (cached) {
            return res.json({ source: "redis", books: JSON.parse(cached) });
        }
  
        // Fetch from DB
        const books = await BookModel.find({ userId });

        // Store in Redis for 1 hour (3600 seconds)
        await redis.set(redisKey, JSON.stringify(books), "EX", 300);

        res.json({ source: "db", books });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch books", error: error.message });
    }
});

/**  
 * POST /books
 * Add a new book
 */
bookRouter.post("/books", authMiddleware(["user"]), async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        const userId = req.user.id;

        const newBook = await BookModel.create({
            title,
            author,
            genre,
            publishedYear,
            userId
        });

        // Invalidate Redis cache for this user
        const redisKey = `${req.redisNamespace}:books`;
        await redis.del(redisKey);

        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Failed to add book", error: error.message });
    }
});
/**
 * PUT /books/:id
 * Update a book by ID
 */
bookRouter.put("/books/:id", authMiddleware(["user"]), async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updates = req.body;

        const updatedBook = await BookModel.findOneAndUpdate(
            { _id: id, userId },
            updates,
            { new: true }
        );

        if (!updatedBook)
            return res.status(404).json({ message: "Book not found" });

        // Invalidate Redis cache
        const redisNamespace = req.redisNamespace || `user:${userId}`;
        await redis.del(`${redisNamespace}:books`);

        res.json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to update book", error: error.message });
    }
});
/**
 * DELETE /books/:id
 * Delete a book by ID
 */
bookRouter.delete("/books/:id", authMiddleware(["user"]), async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedBook = await BookModel.findOneAndDelete({ _id: id, userId });
        if (!deletedBook)
            return res.status(404).json({ message: "Book not found" });

        // Invalidate Redis cache
        const redisNamespace = req.redisNamespace || `user:${userId}`;
        await redis.del(`${redisNamespace}:books`);

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to delete book", error: error.message });
    }
});


bookRouter.post("/books/bulk", authMiddleware(["user"]), async (req, res) => {
    try {
        const userId = req.user.id;
        const books = req.body.books;

        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ message: "Books array is required" });
        }

        const redisKey = `user:${userId}:bulkBooks`;

        // Get existing pending books (if any)
        const existing = await redis.get(redisKey);
        const allBooks = existing ? JSON.parse(existing).concat(books) : books;

        // Store merged books array in Redis
        await redis.set(redisKey, JSON.stringify(allBooks));

        return res.json({
            message: "Books will be added later via background process",
            pendingCount: allBooks.length,
        });
    } catch (error) {
        console.error("Bulk insert error:", error);
        res
            .status(500)
            .json({ message: "Failed to queue books", error: error.message });
    }
});

//  Run every 2 minutes
cron.schedule("*/2 * * * *", async () => {
    try {
        console.log("[CRON] Checking for pending bulk book inserts...");

        // Get all Redis keys for users’ bulk books
        const keys = await redis.keys("user:*:bulkBooks");

        if (keys.length === 0) {
            console.log("[CRON] No pending bulk inserts found.");
            return;
        }

        for (const key of keys) {
            const data = await redis.get(key);
            if (!data) continue;

            const books = JSON.parse(data);
            const userId = key.split(":")[1]; // extract userId from key

            if (books.length === 0) continue;

            // Attach userId to each book record
            const booksToInsert = books.map((b) => ({
                ...b,
                userId,
            }));

            // Insert all books into MongoDB
            await BookModel.insertMany(booksToInsert);

            // Remove from Redis after success
            await redis.del(key);
            await redis.del(`user:${userId}:books`);


            console.log(
                `[CRON] Inserted ${books.length} books for user ${userId} and cleared Redis.`
            );
        }
    } catch (error) {
        console.error("[CRON] Bulk insert failed:", error);
    }
});



module.exports = bookRouter;
