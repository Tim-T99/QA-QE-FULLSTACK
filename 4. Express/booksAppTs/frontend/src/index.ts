import { Book } from "./types"; // Make sure this import exists
import { fetchBooks } from "./bookRenderer";

const displayAllBooks = (books: Book[]) => {
  const booksList = document.getElementById("main");
  if (!booksList) return;

  booksList.innerHTML = books.map(book => `
    <div class="book">
      <img src=${book.image}></img>
      <p id="warning">${book.pages > 500 ? "Long read" : ""}</p>
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</P>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Publisher:</strong> ${book.publisher}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <button class="buy-button">Buy Now</button>
    </div>
  `).join("");
};

const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  displayAllBooks(books);
};

// Load all books initially
loadBooks();