const BookModel = require("../models/Book");
const UserModel = require("../models/User");


//add-book
const addBook = async (req, res) => {

    try {
        const newBook = await BookModel.create(req.body);
        res.status(201).json({ msg: "Book added ", newBook })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//rent-book
const rentBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const book = await BookModel.findById(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        if (user.rentedBooks.includes(bookId)) {
            return res.status(400).json({ error: 'User has already rented this book' });
        }

        user.rentedBooks.push(bookId);
        book.rentedBy.push(userId);

        await user.save();
        await book.save();

        res.status(200).json({ msg: 'Book rented successfully', user, book });
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
//return-book
const returnBook = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        const book = await BookModel.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ error: 'User or Book not found' });
        }

        //  bookId from user.rentedBooks
        user.rentedBooks = user.rentedBooks.filter(
            (id) => id.toString() !== bookId
        );

        //  userId from book.rentedBy
        book.rentedBy = book.rentedBy.filter(
            (id) => id.toString() !== userId
        );

        await user.save();
        await book.save();

        res.status(200).json({ msg: 'Book returned successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get-renters
const getBookRenters = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await BookModel.findById(bookId).populate('rentedBy', 'name email');
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ renters: book.rentedBy });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update Book
const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const updateFields = req.body;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(bookId, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ msg: 'Book updated', book: updatedBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  Delete Book
const deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await BookModel.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Remove the deleted book from all users who had rented it
        await UserModel.updateMany(
            { rentedBooks: bookId },
            { $pull: { rentedBooks: bookId } }
        );

        res.status(200).json({ msg: 'Book deleted and removed from users' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { updateBook, deleteBook, addBook, rentBook, returnBook, getBookRenters }