
const express = require('express');
const { addBook, borrowBook, returnBook, getBooks, deleteBook } = require('../controllers/library.controller');
const validateBook = require('../middleware/validateBook');
const checkBorrowLimit = require('../middleware/checkBorrowLimit');
const bookRouter = express.Router();


bookRouter.post('/add', validateBook, addBook);

bookRouter.patch('/borrow/:id', checkBorrowLimit, borrowBook);

bookRouter.patch('/return/:id', returnBook);

// Get all books (with optional filtering)
bookRouter.get('/all', getBooks);

// Delete a book
bookRouter.delete('/:id', deleteBook);

module.exports = bookRouter
