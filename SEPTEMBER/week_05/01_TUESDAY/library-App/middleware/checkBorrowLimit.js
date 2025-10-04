const BookModel = require("../models/library.model");

// Middleware to limit borrowing to 3 books per borrower
const checkBorrowLimit = async (req, res, next) => {
  const { borrowerName } = req.body;

  if (!borrowerName) {
    return res.status(400).json({ message: "Borrower name is required" });
  }

  try {
    const borrowedCount = await BookModel.countDocuments({
      borrowerName,
      status: "borrowed",
    });

    if (borrowedCount >= 3) {
      return res.status(409).json({
        message: `${borrowerName} cannot borrow more than 3 books at a time`,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = checkBorrowLimit;
