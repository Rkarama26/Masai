const BookModel = require("../models/library.model");

// Add a new book
const addBook = async (req, res) => {
    try {
        const { title, author } = req.body;

        const newBook = new BookModel({
            title,
            author,
            status: 'available',
            overdueFees: 0
        });

        const savedBook = await newBook.save();
        return res.status(201).json({ message: 'Book added successfully', data: savedBook });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { borrowerName } = req.body;

        const book = await BookModel.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.status !== 'available') {
            return res.status(409).json({ message: 'Book is not available for borrowing' });
        }

        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + 14); // Due in 14 days

        book.status = 'borrowed';
        book.borrowerName = borrowerName;
        book.borrowDate = borrowDate;
        book.dueDate = dueDate;
        book.returnDate = null;

        const updatedBook = await book.save();

        return res.status(200).json({ message: 'Book borrowed successfully', data: updatedBook });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Return a book
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await BookModel.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.status !== 'borrowed') {
            return res.status(409).json({ message: 'Book is not currently borrowed' });
        }

        const returnDate = new Date();
        let overdueFees = 0;

        if (book.dueDate && returnDate > book.dueDate) {
            const diffTime = returnDate - book.dueDate;
            const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            overdueFees = overdueDays * 10;
        }

        book.status = 'available';
        book.returnDate = returnDate;
        book.overdueFees = overdueFees;
        book.borrowerName = null;
        book.borrowDate = null;
        book.dueDate = null;

        const updatedBook = await book.save();

        return res.status(200).json({
            message: 'Book returned successfully',
            data: updatedBook,
            overdueFees
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all books with optional filters
const getBooks = async (req, res) => {
    try {
        const { status, title } = req.query;

        let query = {};
        if (status) query.status = status;
        if (title) query.title = { $regex: title, $options: 'i' };

        const books = await BookModel.find(query);
        return res.status(200).json({ message: 'Books retrieved successfully', data: books });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Delete a book (only if not borrowed)
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await BookModel.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.status === 'borrowed') {
            return res.status(409).json({ message: 'Cannot delete a borrowed book' });
        }

        await BookModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


module.exports = { addBook, borrowBook, returnBook, getBooks, deleteBook }