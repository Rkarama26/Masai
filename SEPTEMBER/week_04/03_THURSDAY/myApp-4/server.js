
const { match } = require("assert");
const { error } = require("console");
const express = require("express");
const { readFile } = require("fs");
const fs = require('fs').promises;
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'db.json');
//middleware to  parse json
app.use(express.json());


async function readBooks() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeBooks(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}


// get request to fetch all books
app.get("/books", async (req, res) => {
    try {
        const books = await readBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// add book to db
app.post("/books", async (req, res) => {
    try {
        const newBook = req.body;
        const data = await readBooks();
        const createBook = { id: data.books.length + 1, ...newBook };
        data.books.push(createBook)
        await writeBooks(data);

        res.status(201).json({ message: "book created", book: createBook });
    } catch (error) {
        res.status(500).json({ error: "Filed to add book" })
    }
});

// get book by Id 
app.get("/book/:id", async (req, res) => {

    try {
        const data = await readBooks();
        const bookId = +(req.params.id);

        const book = data.books.find(b => b.id === bookId);
        res.status(200).json({ book: book })
    } catch (error) {
        res.status(500).json({ error: "failed to fetch book" })
    }
})


app.put("/book/:id", async (req, res) => {

    try {
        const bookId = +(req.params.id);

        const data = await readBooks();
        const book = data.books.find(b => b.id === bookId);
        if (!book) return res.status(404).json({ error: "book not found" })

        data.books = data.books.map(b => {
            if (b.id === bookId) {
                return { ...b, ...req.body };
            }
            return b // keep other unchanged
        })

        await writeBooks(data);
        const updated = data.books.find(b => b.id === bookId);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "failed to update" })
    }
})

// delete by idd
app.delete("/books/:id", async (req, res) => {
    try {
        const data = await readBooks();
        const bookId = Number(req.params.id);

        const book = data.books.find(b => b.id === bookId);
        if (!book) return res.status(404).json({ error: "book not found" });

        data.books = data.books.filter(b => b.id !== bookId);

        await writeBooks(data);

        // send confirmation back
        res.json({ message: "book deleted", deletedBook: book });
    } catch (error) {
        res.status(500).json({ error: "failed to delete book" });
    }
});

app.listen(3000, (req, res) => {
    console.log("This is my server running on 3000 port ")
})

app.get("/books/search", async (req, res) => {
    const { author } = req.query;

    if (!author) return res.status(400).json({ error: "author query is required" })

    const data = await readBooks();

    const matches = data.books.filter(b =>
        b.author.toLowerCase().includes(author.toLowerCase())
    )

    if (matches.length === 0) {
        return res.status(404).json({ message: "No books found" })
    }
    res.json(matches)


})