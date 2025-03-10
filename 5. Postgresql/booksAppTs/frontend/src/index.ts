import { Book, BooksArray } from "./types";
import { fetchBooks } from "./bookRenderer";

const displayAllBooks = (books: Book[]) => {
  const booksList = document.getElementById("main");
  if (!booksList) return;
  
  booksList.innerHTML = "";

  books.forEach((book: Book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
      <img src=${book.image}></img>
      <p id="warning">${book.pages > 500 ? "Warning: Book has over 500 pages" : ""}</p>
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</P>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Publisher:</strong> ${book.publisher}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <button class="buy-button">Buy Now</button>`;
    
    booksList.appendChild(bookDiv);
    bookDiv.querySelector(".buy-button")?.addEventListener("click", () => addToCart(book.id));
  });
};

const loadBooks = async (args: string = "") => {
  const books = await fetchBooks(args);
  displayAllBooks(books);
};

const updateBookDisplay = () => {
  const year = (document.getElementById("year") as HTMLInputElement).value;
  const genre = (document.getElementById("genre") as HTMLSelectElement).value;
  const sortOption = (document.getElementById("sortOption") as HTMLSelectElement).value;
  const sortDirection = (document.getElementById("sortDirection") as HTMLSelectElement).value;
  
  const queryParams = new URLSearchParams();
  if (year) queryParams.append("year", year);
  if (genre && genre !== "All") queryParams.append("genre", genre);
  if (sortOption && sortOption !== "default") queryParams.append("sort", sortOption);
  
  if (sortDirection) queryParams.append("direction", sortDirection);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  loadBooks(queryString);
};

// Initial load
loadBooks();

// Event listeners for filter changes
document.getElementById("year")?.addEventListener("input", updateBookDisplay);
document.getElementById("genre")?.addEventListener("change", updateBookDisplay);
document.getElementById("sortOption")?.addEventListener("change", updateBookDisplay);
document.getElementById("sortDirection")?.addEventListener("change", updateBookDisplay);


let globalBooks: BooksArray = [];
let cartBooks: BooksArray = [];
const totalDiv = document.getElementById("total");

function addToCart(id: number): void {
  const book = globalBooks.find(book => book.id === id);
  if (!book) return;
  
  const existingBook = cartBooks.find(item => item.id === id);

  if (existingBook) {
    existingBook.quantity = (existingBook.quantity || 0) + 1;
  } else {
    cartBooks.push({ ...book, quantity: 1 });
  }

  renderCartItems(cartBooks);
}

function renderCartItems(cartBooks: BooksArray): void {
  const cartDiv = document.getElementById("cartDiv");
  const mainCartDiv = document.getElementById("mainCartDiv");
  
  if (!cartDiv || !mainCartDiv) return;
  
  cartDiv.innerHTML = "";
  let totalPrice = 0;
  
  cartBooks.forEach(item => {
    const cartBookDiv = document.createElement("div");
    cartBookDiv.classList.add("book");
    const subtotal = (item.quantity || 0) * item.price;
    totalPrice += subtotal;
    
    cartBookDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <p id="warning">${item.pages > 500 ? "Warning: Book has over 500 pages" : ""}</p>
      <h2>${item.title}</h2>
      <p><strong>Author:</strong> ${item.author}</p>
      <p><strong>Genre:</strong> ${item.genre}</p>
      <p><strong>Year:</strong> ${item.year}</p>
      <p><strong>Pages:</strong> ${item.pages}</p>
      <p><strong>Publisher:</strong> ${item.publisher}</p>
      <p><strong>Price:</strong> Kes ${item.price}</p>
      <p><strong>Quantity:</strong> <span id="qty-${item.id}">${item.quantity}</span></p>
      <div class="quantity-buttons">
        <button class="reduce-btn">➖</button>
        <button class="increase-btn">➕</button>
      </div>
      <p><strong>Subtotal:</strong> $<span id="subtotal-${item.id}">${subtotal.toFixed(2)}</span></p>
    `;
    
    cartDiv.appendChild(cartBookDiv);
    
    cartBookDiv.querySelector(".increase-btn")?.addEventListener("click", () => changeQuantity(item.id, 1));
    cartBookDiv.querySelector(".reduce-btn")?.addEventListener("click", () => changeQuantity(item.id, -1));
  });
  
  if (totalDiv) {
    totalDiv.id = "totalPriceDiv";
    totalDiv.innerHTML = `<h3>Total: $<span id="total-price">${totalPrice.toFixed(2)}</span></h3>`;
    mainCartDiv.appendChild(totalDiv);
  }
}

function changeQuantity(id: number, change: number): void {
  const bookIndex = cartBooks.findIndex(item => item.id === id);

  if (bookIndex !== -1) {
    cartBooks[bookIndex].quantity = (cartBooks[bookIndex].quantity || 0) + change;

    if (cartBooks[bookIndex].quantity! <= 0) {
      cartBooks.splice(bookIndex, 1);
    }

    renderCartItems(cartBooks);
  }
}

const showCart = document.getElementById("cart");
showCart?.addEventListener("click", displayCart);

function displayCart(): void {
  const mainCartDiv = document.getElementById("mainCartDiv");
  if (!mainCartDiv) return;

  const isHidden = mainCartDiv.style.visibility === "hidden" || mainCartDiv.style.opacity === "0";
  mainCartDiv.style.visibility = isHidden ? "visible" : "hidden";
  mainCartDiv.style.opacity = isHidden ? "1" : "0";

  const clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.onclick = () => {
      cartBooks.length = 0;
      renderCartItems(cartBooks);
    };
    mainCartDiv.appendChild(clearBtn);
  }

  const checkOutBtn = document.getElementById("checkout");
  if (checkOutBtn) {
    checkOutBtn.onclick = () => renderCartItems(cartBooks);
    mainCartDiv.appendChild(checkOutBtn);
  }
}

// Close button functionality
document.getElementById("close")?.addEventListener("click", () => {
  const mainCartDiv = document.getElementById("mainCartDiv");
  if (mainCartDiv) {
    mainCartDiv.style.visibility = "hidden";
    mainCartDiv.style.opacity = "0";
  }
});

//book form functionality
document.getElementById("add-book")?.addEventListener("click", displayForm);

function displayForm(): void {
  const formDiv = document.getElementById("book-form");
  if (!formDiv) return;

  const isHidden = formDiv.style.visibility === "hidden" || formDiv.style.opacity === "0";
  formDiv.style.visibility = isHidden ? "visible" : "hidden";
  formDiv.style.opacity = isHidden ? "1" : "0";
  formDiv.style.zIndex = isHidden ? "2" : "-1"

  const clearBtn = document.getElementById("clear-form");
  if (clearBtn) {
    clearBtn.onclick = () => {
      cartBooks.length = 0;
      renderCartItems(cartBooks);
    };
    formDiv.appendChild(clearBtn);
  }
}

