
const express = require('express');
const { addBook, rentBook, returnBook, getBookRenters, updateBook, deleteBook } = require('../controllers/book.controller');


const bookRoutes = express.Router();

bookRoutes.post('/add-book', addBook);

bookRoutes.post('/rent-book', rentBook);

bookRoutes.post('/return-book', returnBook);

bookRoutes.get('/book-renters/:bookId', getBookRenters);

bookRoutes.put('/update-book/:bookId', updateBook);


bookRoutes.put('/delete-book/:bookId', deleteBook);



module.exports = bookRoutes;
