import { getBookById } from "../models/bookModel.js";
import { daysBetween, formatISODate } from "../utils/dateUtils.js";

export async function returnCheckMiddleware(req, res, next) {
  try {
    const id = req.params.id;
    const book = await getBookById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status !== "borrowed") {
      return res.status(409).json({ error: "Book is not currently borrowed" });
    }

    if (!book.borrowedDate) {
      return res.status(400).json({ error: "Borrowed date missing" });
    }

    const today = formatISODate(new Date());
    const days = daysBetween(book.borrowedDate, today);

    if (days < 3) {
      return res.status(400).json({ error: "Book cannot be returned within 3 days of borrowing." });
    }

    // OK
    next();
  } catch (err) {
    next(err);
  }
}
