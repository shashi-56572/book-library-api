const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "books.json");

// Helpers to read and write the JSON file (our simple "database")
function readBooks() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}
function writeBooks(books) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

// GET /api/books  -> all books (optional ?search=word)
router.get("/", (req, res) => {
  let books = readBooks();
  const { search } = req.query;
  if (search) {
    const word = search.toLowerCase();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(word) ||
        b.author.toLowerCase().includes(word)
    );
  }
  res.json(books);
});

// GET /api/books/:id  -> one book
router.get("/:id", (req, res) => {
  const book = readBooks().find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST /api/books  -> add a book
router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  const books = readBooks();
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    read: false,
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// PUT /api/books/:id  -> update a book (title, author, read)
router.put("/:id", (req, res) => {
  const books = readBooks();
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author, read } = req.body;
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (read !== undefined) book.read = Boolean(read);

  writeBooks(books);
  res.json(book);
});

// DELETE /api/books/:id  -> remove a book
router.delete("/:id", (req, res) => {
  const books = readBooks();
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const [removed] = books.splice(index, 1);
  writeBooks(books);
  res.json(removed);
});

module.exports = router;
