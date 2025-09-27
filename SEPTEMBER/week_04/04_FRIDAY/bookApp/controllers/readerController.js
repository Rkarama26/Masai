import { getAllBooks, getBookById, updateBook } from "../models/bookModel.js";
import { logTransaction } from "../middleware/transactionLogger.js";
import { formatISODate } from "../utils/dateUtils.js";

export async function listAvailableBooks(req, res, next) {
  try {
    const books = await getAllBooks();
    const available = books.filter(b => b.status === "available");
    res.json(available);
  } catch (err) { next(err); }
}

export async function borrowBook(req, res, next) {
  try {
    const id = req.params.id;
    const { readerName } = req.body;
    if (!readerName) return res.status(400).json({ error: "readerName is required" });

    const book = await getBookById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status !== "available") {
      return res.status(409).json({ error: "Book is not available for borrowing" });
    }

    const borrowedDate = formatISODate(new Date()); // YYYY-MM-DD
    const updated = await updateBook(id, {
      status: "borrowed",
      borrowedBy: readerName,
      borrowedDate
    });

    // log transaction
    await logTransaction(`${readerName} borrowed "${updated.title}"`);

    res.json(updated);
  } catch (err) { next(err); }
}

export async function returnBook(req, res, next) {
  try {
    const id = req.params.id;
    const book = await getBookById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status !== "borrowed") {
      return res.status(409).json({ error: "Book is not currently borrowed" });
    }

    // By the time this controller runs, returnCheckMiddleware has already validated
    const readerName = book.borrowedBy ?? "Unknown";
    const updated = await updateBook(id, {
      status: "available",
      borrowedBy: null,
      borrowedDate: null
    });

    await logTransaction(`${readerName} returned "${book.title}"`);
    res.json(updated);
  } catch (err) { next(err); }
}
