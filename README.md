# Book Library API

**Live Demo:** https://book-library-api-dbbe.onrender.com (hosted on Render's free plan, so the first load after a period of inactivity can take about a minute while the server wakes up. Data added on the demo may reset when the server restarts.)

A simple REST API built with **Node.js** and **Express** to manage a personal book library, plus a small web page that uses the API. Books are stored in a JSON file, so no database setup is needed.

## Features

- Full CRUD: create, read, update and delete books
- Search books by title or author (`?search=`)
- Mark a book as read / unread
- Input validation and proper HTTP status codes (200, 201, 400, 404)
- Simple front end (HTML, CSS, vanilla JavaScript) that calls the API with `fetch`

## Tech Stack

- Node.js
- Express
- JSON file storage (`fs` module)
- HTML, CSS, JavaScript

## API Endpoints

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| GET    | `/api/books`       | Get all books (`?search=word`)       |
| GET    | `/api/books/:id`   | Get one book                         |
| POST   | `/api/books`       | Add a book (`title`, `author`)       |
| PUT    | `/api/books/:id`   | Update `title`, `author` or `read`   |
| DELETE | `/api/books/:id`   | Delete a book                        |

Example:

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Atomic Habits","author":"James Clear"}'
```

## Project Structure

```
server.js          # starts the Express app
routes/books.js    # all /api/books routes
data/books.json    # book data (acts as the database)
public/            # front end (index.html, app.js, style.css)
```

## How to Run

```bash
git clone https://github.com/shashi-56572/book-library-api.git
cd book-library-api
npm install
npm start
```

Open http://localhost:3000 in your browser.

## What I Learned

- Building REST routes with Express and `express.Router`
- Reading JSON request bodies with `express.json()`
- Using the correct HTTP methods and status codes
- Calling an API from the browser with `fetch`

## Possible Improvements

- Replace the JSON file with MongoDB (Mongoose)
- Add user login with JWT
- Add pagination

## Author

Shashi Chouhan, B.Tech CSE (Oriental College of Technology, Bhopal)
