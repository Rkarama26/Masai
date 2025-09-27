const express = require("express");
const {
  listAvailableBooks,
  borrowBook,
  returnBook
} = require("../controllers/readerController.js");

const { returnCheckMiddleware } = require("../middleware/returnCheckMiddleware.js");

const router = express.Router();

// GET 
router.get("/books", listAvailableBooks);

// Borrow -> POST 
router.post("/borrow/:id", borrowBook);

// Return -> POST 
router.post("/return/:id", returnCheckMiddleware, returnBook);

module.exports = router;
