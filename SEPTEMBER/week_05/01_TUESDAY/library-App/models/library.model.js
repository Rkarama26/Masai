const { default: mongoose } = require("mongoose");

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, enum: ["available", "borrowed"] },
    borrowerName: { type: String },
    borrowDate: { type: Date },
    dueDate: { type: Date },
    returnDate: { type: Date },
    overdueFees: { type: Number },
})

const BookModel = new mongoose.model("book", BookSchema);

module.exports = BookModel;