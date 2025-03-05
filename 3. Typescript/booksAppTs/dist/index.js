var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let globalBooks = [];
let cartBooks = [];
const totalDiv = document.getElementById("total");
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/books");
            globalBooks = yield response.json();
            displayBooks(globalBooks);
        }
        catch (_a) {
            alert("Cannot fetch data");
        }
    });
}
function displayBooks(booksToDisplay) {
    const booksList = document.getElementById("main");
    if (!booksList)
        return;
    booksList.innerHTML = "";
    booksToDisplay.forEach((book) => {
        var _a;
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
        (_a = bookDiv.querySelector(".buy-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => addToCart(book.id));
    });
}
const changeYear = document.getElementById("year");
changeYear === null || changeYear === void 0 ? void 0 : changeYear.addEventListener("keyup", filtered);
function filtered() {
    const inputYear = document.getElementById("year");
    if (!inputYear)
        return;
    try {
        const yearVal = parseInt(inputYear.value, 10);
        if (isNaN(yearVal) || yearVal <= 800) {
            displayBooks(globalBooks);
        }
        else {
            displayBooks(globalBooks.filter(book => book.year <= yearVal));
        }
    }
    catch (_a) {
        console.log("Could not filter");
    }
}
const genreElement = document.getElementById("genre");
genreElement === null || genreElement === void 0 ? void 0 : genreElement.addEventListener("change", filteredGenre);
function filteredGenre() {
    var _a;
    try {
        const inputGenre = (_a = document.getElementById("genre")) === null || _a === void 0 ? void 0 : _a.value;
        if (!inputGenre)
            return;
        if (inputGenre === "All") {
            displayBooks(globalBooks);
        }
        else {
            displayBooks(globalBooks.filter(book => book.genre === inputGenre));
        }
    }
    catch (_b) {
        console.log("Could not filter genre");
    }
}
const sortEl = document.getElementById("sortOption");
const sortDir = document.getElementById("sortDirection");
sortEl === null || sortEl === void 0 ? void 0 : sortEl.addEventListener("change", sortBooks);
sortDir === null || sortDir === void 0 ? void 0 : sortDir.addEventListener("change", sortBooks);
function sortBooks() {
    var _a, _b;
    try {
        const sortBy = (_a = document.getElementById("sortOption")) === null || _a === void 0 ? void 0 : _a.value;
        const sortDirection = (_b = document.getElementById("sortDirection")) === null || _b === void 0 ? void 0 : _b.value;
        if (!sortBy || !sortDirection)
            return;
        let sortedBooks = [...globalBooks];
        switch (sortBy) {
            case "year":
                sortedBooks.sort((a, b) => sortDirection === "asc" ? a.year - b.year : b.year - a.year);
                break;
            case "genre":
                sortedBooks.sort((a, b) => sortDirection === "asc" ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre));
                break;
            case "pages":
                sortedBooks.sort((a, b) => sortDirection === "asc" ? a.pages - b.pages : b.pages - a.pages);
                break;
            case "title":
                sortedBooks.sort((a, b) => sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
                break;
            case "default":
                return displayBooks(globalBooks);
            default:
                return;
        }
        displayBooks(sortedBooks);
    }
    catch (_c) {
        console.log("Could not sort books");
    }
}
function addToCart(id) {
    const book = globalBooks.find(book => book.id === id);
    if (!book)
        return;
    const existingBook = cartBooks.find(item => item.id === id);
    if (existingBook) {
        existingBook.quantity = (existingBook.quantity || 0) + 1;
    }
    else {
        cartBooks.push(Object.assign(Object.assign({}, book), { quantity: 1 }));
    }
    renderCartItems(cartBooks);
}
function renderCartItems(cartBooks) {
    const cartDiv = document.getElementById("cartDiv");
    const mainCartDiv = document.getElementById("mainCartDiv");
    if (!cartDiv || !mainCartDiv)
        return;
    cartDiv.innerHTML = "";
    let totalPrice = 0;
    cartBooks.forEach(item => {
        var _a, _b;
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
        (_a = cartBookDiv.querySelector(".increase-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => changeQuantity(item.id, 1));
        (_b = cartBookDiv.querySelector(".reduce-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => changeQuantity(item.id, -1));
    });
    if (totalDiv) {
        totalDiv.id = "totalPriceDiv";
        totalDiv.innerHTML = `<h3>Total: $<span id="total-price">${totalPrice.toFixed(2)}</span></h3>`;
        mainCartDiv.appendChild(totalDiv);
    }
}
function changeQuantity(id, change) {
    const bookIndex = cartBooks.findIndex(item => item.id === id);
    if (bookIndex !== -1) {
        cartBooks[bookIndex].quantity = (cartBooks[bookIndex].quantity || 0) + change;
        if (cartBooks[bookIndex].quantity <= 0) {
            cartBooks.splice(bookIndex, 1);
        }
        renderCartItems(cartBooks);
    }
}
// Initialize on page load
document.addEventListener("DOMContentLoaded", fetchBooks);
// Cart display functionality
const showCart = document.getElementById("cart");
showCart === null || showCart === void 0 ? void 0 : showCart.addEventListener("click", displayCart);
function displayCart() {
    const mainCartDiv = document.getElementById("mainCartDiv");
    if (!mainCartDiv)
        return;
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
(_a = document.getElementById("close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const mainCartDiv = document.getElementById("mainCartDiv");
    if (mainCartDiv) {
        mainCartDiv.style.visibility = "hidden";
        mainCartDiv.style.opacity = "0";
    }
});
export {};
//# sourceMappingURL=index.js.map