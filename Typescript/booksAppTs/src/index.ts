import { Book, BooksArray } from "./types";


let globalBooks:BooksArray = [];
let cartBooks:BooksArray = [];
const totalDiv:HTMLElement | null = document.getElementById("total");

async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    globalBooks = await response.json();
    displayBooks(globalBooks);
  } catch {
    alert("Cannot fetch data");
  }
}

function displayBooks(booksToDisplay:BooksArray):void {
  const booksList:HTMLElement | null = document.getElementById("main");
  if (!booksList){
    throw new Error("Books string not available")
  }
  booksList.innerHTML = "";

  booksToDisplay.forEach((book:Book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
          <img src = ${book.image}></img>
          <p id="warning">${
            book.pages > 500 ? "Warning: Book has over 500 pages" : ""
          }</p>
          <h2>${book.title}</h2>
          <p>${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</P>
          <p><strong>Year:</strong> ${book.year}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Publisher:</strong> ${book.publisher}</p>
          <p><strong>Description:</strong> ${book.description}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <button id="buy" class="buy-button"">Buy Now</button>`;
    booksList.appendChild(bookDiv);

    const buyButton = bookDiv.querySelector(`.buy-button`);
    if (buyButton) {
      buyButton.addEventListener("click", () => addToCart(book.id));
    }
  });
}

const changeYear = document.getElementById("year")
changeYear.addEventListener("keyup", filtered)

function filtered() {
  const inputYear = document.getElementById("year").value;
  try {
    if (inputYear <= 799 || "") {
      displayBooks(globalBooks);
      return;
    } else {
      const filteredBooks = globalBooks.filter(
        (book) => book.year <= inputYear
      );
      displayBooks(filteredBooks);
    }
  } catch {
    console.log("Could not filter");
  }
}

const genreElement = document.getElementById("genre");
genreElement.addEventListener("change", filteredGenre);

function filteredGenre() {
  try {
    const inputgenre = document.getElementById("genre").value;
    if (inputgenre === "All") {
      displayBooks(globalBooks);
    } else {
      const filteredBooks = globalBooks.filter(
        (book) => book.genre === inputgenre
      );
      displayBooks(filteredBooks);
    }
  } catch (error) {
    console.log("Could not filter", error);
  }
}

const sortEl = document.getElementById("sortOption");
const sortDir = document.getElementById("sortDirection");
sortEl.addEventListener("change", sortBooks)
sortDir?.addEventListener("change", sortBooks)

function sortBooks() {
  try {
    const sortBy = document.getElementById("sortOption").value;
    const sortDirection = document.getElementById("sortDirection").value;
    let sortedBooks = [...globalBooks];

    switch (sortBy) {
      case "year":
        sortedBooks.sort((a, b) =>
          sortDirection === "asc" ? a.year - b.year : b.year - a.year
        );
        break;
      case "genre":
        sortedBooks.sort((a, b) => {
          return sortDirection === "asc"
            ? a.genre.localeCompare(b.genre)
            : b.genre.localeCompare(a.genre);
        });
        break;
      case "pages":
        sortedBooks.sort((a, b) =>
          sortDirection === "asc" ? a.pages - b.pages : b.pages - a.pages
        );
        break;
      case "title":
        sortedBooks.sort((a, b) => {
          return sortDirection === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });
        break;
        case "default":
          displayBooks(globalBooks);
          break;
      default:
        console.log("Invalid sort criteria");
        return;
    }

    displayBooks(sortedBooks);
    console.log(
      `Books sorted by ${sortBy} in ${
        sortDirection === "asc" ? "ascending" : "descending"
      } order`
    );
  } catch {
    console.log("Could not sort books");
  }
}

function addToCart(id: number): void {
  // The find method needs a callback function - not just the id
  const book = globalBooks.find((book) => book.id === id);
  
  if (!book) {
    console.error(`Book with id ${id} not found`);
    return;
  }
  
  console.log(book);

  // Find if the book is already in cartBooks
  const existingBook = cartBooks.find((item) => item.id === book.id);

  if (existingBook) {
    // If book exists, increase quantity
    existingBook.quantity = (existingBook.quantity || 0) + 1;
  } else {
    // If book does not exist, add it with quantity 1
    cartBooks.push({ ...book, quantity: 1 });
  }

  console.log(cartBooks);
  renderCartItems(cartBooks);
}

function renderCartItems(cartBooks: BooksArray): void {
  const cartDiv = document.getElementById("cartDiv");
  const mainCartDiv = document.getElementById("mainCartDiv");
  
  if (!cartDiv || !mainCartDiv) {
    console.error("Cart elements not found");
    return;
  }
  
  cartDiv.innerHTML = "";
  let totalPrice = 0;
  
  cartBooks.forEach((item) => {
    const cartBookDiv = document.createElement("div");
    cartBookDiv.classList.add("book");
    const subtotal = (item.quantity || 0) * item.price;
    totalPrice += subtotal;
    
    cartBookDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <p id="warning">${
        item.pages > 500 ? "Warning: Book has over 500 pages" : ""
      }</p>
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
    
    const addQtyBtn = cartBookDiv.querySelector(".increase-btn");
    if (addQtyBtn) {
      addQtyBtn.addEventListener("click", () => changeQuantity(item.id, 1));
    }
    
    const reduceQtyBtn = cartBookDiv.querySelector(".reduce-btn");
    if (reduceQtyBtn) {
      reduceQtyBtn.addEventListener("click", () => changeQuantity(item.id, -1));
    }
  });
  
  if (totalDiv) {
    totalDiv.id = "totalPriceDiv";
    totalDiv.innerHTML = `<h3>Total: $<span id="total-price">${totalPrice.toFixed(2)}</span></h3>`;
    mainCartDiv.appendChild(totalDiv);
  }
}



function changeQuantity(id: number, change: number): void {
  const bookIndex = cartBooks.findIndex((item) => item.id === id);

  if (bookIndex !== -1) {
    if (cartBooks[bookIndex].quantity === undefined) {
      cartBooks[bookIndex].quantity = 0;
    }
    
    cartBooks[bookIndex].quantity! += change;

    if (cartBooks[bookIndex].quantity! <= 0) {
      cartBooks.splice(bookIndex, 1);
    }

    renderCartItems(cartBooks);
  }
}



// Initialize on page load
document.addEventListener("DOMContentLoaded", fetchBooks);

const showCart = document.getElementById("cart");
showCart.addEventListener("click", displayCart)
function displayCart() {
  const mainCartDiv = document.getElementById("mainCartDiv");

  if (
    mainCartDiv.style.visibility === "hidden" ||
    mainCartDiv.style.opacity === "0"
  ) {
    mainCartDiv.style.visibility = "visible";
    mainCartDiv.style.opacity = "1";
  } else {
    mainCartDiv.style.visibility = "hidden";
    mainCartDiv.style.opacity = "0";
  }
}

const clearBtn = document.getElementById("clear");
clearBtn.onclick = () => {
  // Clear the cartBooks array and re-render the cart
  cartBooks.length = 0;
  renderCartItems(cartBooks);
};
mainCartDiv.appendChild(clearBtn);

const checkOutBtn = document.getElementById("checkout");
checkOutBtn.onclick = () => {
  renderCartItems(cartBooks);
};
mainCartDiv.appendChild(checkOutBtn);

// Create and append the "Close" button
document.getElementById("close").onclick = function () {
  document.getElementById("mainCartDiv").style.visibility = "hidden";
  document.getElementById("mainCartDiv").style.opacity = "0";
};
