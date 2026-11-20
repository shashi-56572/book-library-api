const express = require("express");
const path = require("path");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());                                   // read JSON request bodies
app.use(express.static(path.join(__dirname, "public")));   // serve the simple web page
app.use("/api/books", booksRouter);                        // all book routes live here

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
