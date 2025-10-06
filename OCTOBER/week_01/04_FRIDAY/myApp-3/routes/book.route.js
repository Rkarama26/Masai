


const express = require('express');
const { addBook, borrowBook, returnBook, getBookBorrowers, updateBook, deleteBook } = require('../controllers/book.controller');

const bookRouter = express.Router()

bookRouter.post("/add-book", addBook)

bookRouter.post("/borrow-book", borrowBook)
bookRouter.post("/return-book", returnBook)

bookRouter.get("/book-borrowers/:bookId", getBookBorrowers)

bookRouter.get("/update-book/:bookId", updateBook)
bookRouter.get("/delete-book/:bookId", deleteBook)

module.exports = bookRouter; 