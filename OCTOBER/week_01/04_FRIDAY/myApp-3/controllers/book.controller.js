const BookModel = require("../models/book.model");
const MemberModel = require("../models/user.member");


//add-book
const addBook = async (req, res) => {
    try {
        const { title, author } = req.body;

        // Manual validation
        if (!title || title.length < 3) {
            return res.status(400).json({ error: 'Title is required and must be at least 3 characters long.' });
        }

        if (!author) {
            return res.status(400).json({ error: 'Author is required.' });
        }

        const newBook = await BookModel.create({
            title,
            author,
            status: 'available'
        });

        res.status(201).json({ msg: 'Book added', book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const borrowBook = async (req, res) => {
    try {
        const { bookId, memberId } = req.body;


        const book = await BookModel.findById(bookId);
        const member = await MemberModel.findById(memberId);

        if (!book || !member) {
            return res.status(404).json({ message: 'Book or member not found' });
        }

        // if (book.status === 'borrowed') {
        //     return res.status(400).json({ message: 'Book is already borrowed' });
        // }

        // Update book
        // book.status = 'borrowed';
        book.borrowers.push(member._id);
        await book.save();

        // Update member
        member.borrowedBooks.push(book._id);
        await member.save();

        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const returnBook = async (req, res) => {
    try {
        const { bookId, memberId } = req.body;

        const book = await BookModel.findById(bookId);
        const member = await MemberModel.findById(memberId);

        if (!book || !member) {
            return res.status(404).json({ message: 'Book or member not found' });
        }

        // Update book
        book.status = 'available';
        book.borrowers = book.borrowers.filter(
            (borrowerId) => borrowerId.toString() !== memberId
        );
        await book.save();

        // Update member
        member.borrowedBooks = member.borrowedBooks.filter(
            (bId) => bId.toString() !== bookId
        );
        await member.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookBorrowers = async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await BookModel.findById(bookId).populate('borrowers');

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ borrowers: book.borrowers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { title, author } = req.body;

        const book = await BookModel.findByIdAndUpdate(
            bookId,
            { title, author },
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await Book.findByIdAndDelete(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Remove this book from all members
        await Member.updateMany(
            { borrowedBooks: bookId },
            { $pull: { borrowedBooks: bookId } }
        );

        res.status(200).json({ message: 'Book deleted and removed from members' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    addBook,
    borrowBook,
    returnBook,
    getBookBorrowers,
    updateBook,
    deleteBook
}