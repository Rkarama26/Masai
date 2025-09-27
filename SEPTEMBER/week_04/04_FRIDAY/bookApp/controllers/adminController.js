import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
} from "../models/bookModel.js";

export async function createBook(req, res, next) {
  try {
    const { title, author, genre, publishedYear, status } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: "title and author are required" });
    }
    const book = await addBook({ title, author, genre, publishedYear, status });
    return res.status(201).json(book);
  } catch (err) { next(err); }
}

export async function listAllBooks(req, res, next) {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) { next(err); }
}

export async function patchBook(req, res, next) {
  try {
    const id = req.params.id;
    const existing = await getBookById(id);
    if (!existing) return res.status(404).json({ error: "Book not found" });

    // Prevent id changes
    const updates = { ...req.body };
    delete updates.id;

    const updated = await updateBook(id, updates);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function removeBook(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await deleteBook(id);
    if (!ok) return res.status(404).json({ error: "Book not found" });
    res.json({ success: true });
  } catch (err) { next(err); }
}
