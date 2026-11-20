const form = document.getElementById("book-form");
const list = document.getElementById("book-list");
const search = document.getElementById("search");

// Fetch books from the API and draw them on the page
async function loadBooks() {
  const res = await fetch("/api/books?search=" + encodeURIComponent(search.value));
  const books = await res.json();

  list.innerHTML = "";
  books.forEach((book) => {
    const li = document.createElement("li");
    li.className = book.read ? "read" : "";
    li.innerHTML = `
      <span><strong></strong> by <em></em></span>
      <div>
        <button data-action="toggle">${book.read ? "Mark unread" : "Mark read"}</button>
        <button data-action="delete" class="danger">Delete</button>
      </div>`;
    // textContent keeps user input safe from HTML injection
    li.querySelector("strong").textContent = book.title;
    li.querySelector("em").textContent = book.author;

    li.querySelector('[data-action="toggle"]').onclick = async () => {
      await fetch("/api/books/" + book.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !book.read }),
      });
      loadBooks();
    };
    li.querySelector('[data-action="delete"]').onclick = async () => {
      await fetch("/api/books/" + book.id, { method: "DELETE" });
      loadBooks();
    };
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
    }),
  });
  form.reset();
  loadBooks();
});

search.addEventListener("input", loadBooks);
loadBooks();
