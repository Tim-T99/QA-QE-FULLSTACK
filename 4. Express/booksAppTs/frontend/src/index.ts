import { Book } from "./types";
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
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Publisher:</strong> ${book.publisher}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <p><strong>Price:</strong> $${(book.price / 100).toFixed(2)}</p>
      <button class="buy-button">Buy Now</button>
    </div>
  `).join("");
};

const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  displayAllBooks(books);
};

const updateBookDisplay = () => {
  const year = (document.getElementById("year") as HTMLInputElement).value;
  const genre = (document.getElementById("genre") as HTMLSelectElement).value;

  const queryParams = new URLSearchParams();
  if (year) queryParams.append("year", year);
  if (genre && genre !== "All") queryParams.append("genre", genre);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  loadBooks(queryString);
};

// Initial load
loadBooks();

// Event listeners for filter changes
document.getElementById("year")?.addEventListener("input", updateBookDisplay);
document.getElementById("genre")?.addEventListener("change", updateBookDisplay);