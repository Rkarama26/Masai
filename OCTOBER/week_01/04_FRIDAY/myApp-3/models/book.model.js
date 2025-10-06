const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'borrowed'],
        required: true
    },
    borrowers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bookSchema.pre('save', function (next) {
    // If trying to borrow the book (status = borrowed), but it's already borrowed
    if (this.isModified('status') && this.status === 'borrowed' && this.borrowers.length === 0) {
        return next(new Error('Cannot mark as borrowed without a borrower.'));
    }

    next();
});

bookSchema.post('save', async function (doc, next) {
    // If no borrowers left,  status is available
    if (doc.borrowers.length === 0 && doc.status !== 'available') {
        try {
            doc.status = 'available';
            await doc.save();
        } catch (err) {
            return next(err);
        }
    }

    next();
});

const BookModel = mongoose.model('Book', bookSchema);
module.exports = BookModel
