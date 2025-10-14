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

//  Run every 1 minutes
cron.schedule("*/1 * * * *", async () => {
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
            let successCount = 0;
            let failCount = 0;

            //  userId to each book record
            const booksToInsert = books.map((b) => ({
                ...b,
                userId,
            }));
            for (const book of booksToInsert) {
                try {
                    await BookModel.create(book);
                    successCount++;
                } catch (error) {
                    failCount++
                }
            }

            // Store status in Redis per user
            await redis.set(
                statusKey,
                JSON.stringify({
                    userId,
                    successCount,
                    failCount,
                    timestamp: new Date().toISOString(),
                })
            );


            // Removing from Redis after success
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

// 5-minute report cron
cron.schedule("*/1 * * * *", async () => {
    console.log("[REPORT CRON] Checking for bulk insertion statuses...");

    try {
        // Get all bulk status keys
        const keys = await redis.keys("user:*:bulkStatus");

        if (keys.length === 0) {
            console.log("[REPORT CRON] No pending statuses found.");
            return;
        }

        for (const key of keys) {
            try {
                // Get the status JSON string and parse it
                const statusStr = await redis.get(key);
                if (!statusStr) continue;

                const status = JSON.parse(statusStr);

                const user = await UserModel.findById(status.userId);
                if (!user) continue;

                // Generate PDF in memory
                const doc = new PDFDocument();
                const buffers = [];
                doc.on("data", (chunk) => buffers.push(chunk));
                doc.on("end", async () => {
                    const pdfBuffer = Buffer.concat(buffers);

                    // Send email with attachment using your centralized method
                    const htmlBody = `<p>Hello ${user.username},</p>
                                      <p>Here is your bulk book insertion report.</p>`;
                    try {
                        // Update your sendMail to accept attachments if needed
                        await sendMail(user.email, "Bulk Book Insertion Report", htmlBody, pdfBuffer);
                        console.log(`[REPORT] Email sent to ${user.email}`);

                        // Delete the status key to avoid resending
                        await redis.del(key);
                    } catch (err) {
                        console.error(`[REPORT] Failed to send email to ${user.email}:`, err.message);
                    }
                });

                // PDF content
                doc.fontSize(18).text("Bulk Book Insertion Report", { align: "center" });
                doc.moveDown();
                doc.fontSize(12).text(`User ID: ${status.userId}`);
                doc.text(`Success Count: ${status.successCount}`);
                doc.text(`Failed Count: ${status.failCount}`);
                doc.text(`Timestamp: ${status.timestamp}`);
                doc.end();
            } catch (err) {
                console.error(`[REPORT] Failed processing key ${key}:`, err.message);
            }
        }
    } catch (error) {
        console.error("[REPORT CRON] Error fetching status keys:", error.message);
    }
});




module.exports = bookRouter;
