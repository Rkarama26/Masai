// middleware/validateBook.js
const validateBook = (req, res, next) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Incomplete Data" });
    }

    next();
};

module.exports = validateBook;
