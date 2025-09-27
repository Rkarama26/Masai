import fs from "fs/promises";
import path from "path";

const DB_PATH = path.resolve("db.json");

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      // initialize if missing
      const init = { books: [] };
      await writeDB(init);
      return init;
    }
    throw err;
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getAllBooks() {
  const db = await readDB();
  return db.books;
}

export async function getBookById(id) {
  const books = await getAllBooks();
  return books.find(b => Number(b.id) === Number(id)) || null;
}

export async function addBook(bookData) {
  const db = await readDB();
  const books = db.books;
  const maxId = books.reduce((m, b) => Math.max(m, Number(b.id) || 0), 0);
  const id = maxId + 1;
  const newBook = {
    id,
    title: bookData.title ?? "",
    author: bookData.author ?? "",
    genre: bookData.genre ?? "",
    publishedYear: bookData.publishedYear ?? null,
    status: bookData.status ?? "available",
    borrowedBy: bookData.borrowedBy ?? null,
    borrowedDate: bookData.borrowedDate ?? null
  };
  books.push(newBook);
  await writeDB({ books });
  return newBook;
}

export async function updateBook(id, updates) {
  const db = await readDB();
  const books = db.books;
  const idx = books.findIndex(b => Number(b.id) === Number(id));
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...updates, id: books[idx].id };
  await writeDB({ books });
  return books[idx];
}

export async function deleteBook(id) {
  const db = await readDB();
  const books = db.books;
  const idx = books.findIndex(b => Number(b.id) === Number(id));
  if (idx === -1) return false;
  books.splice(idx, 1);
  await writeDB({ books });
  return true;
}
