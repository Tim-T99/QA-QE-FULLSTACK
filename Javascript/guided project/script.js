let globalBooks = [];
let cartBooks = [];

async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    globalBooks = await response.json();
    displayBooks(globalBooks);
  } catch {
    alert("Cannot fetch data");
  }
}

//Reusable function to  display books  for filtering
function displayBooks(booksToDisplay) {
  const booksList = document.getElementById("main");
  booksList.innerHTML = "";

  booksToDisplay.forEach((book) => {
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
          <button id="buy" onclick="addToCart(${book.id})">Buy Now</button>`;
    booksList.appendChild(bookDiv);
  });
}

function filtered() {
  try {
    const inputYear = document.getElementById("year").value;
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
  } catch {
    console.log("Could not filter");
  }
}

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

// const buyButton = document.getElementById("buy");
// buyButton.addEventListener("click", addToCart);

function addToCart(id) {
  if(globalBooks.some((item) => item.id === id)) {
    // This item is already in the cart
    const existingItem = globalBooks.some((item) => item.id === id);
    existingItem.numberOfUnits += 1;
    renderCartItems(); // Remove the parameter
  } else {
    // Item not in cart yet, add it
    const item = globalBooks.find((selectedBook) => selectedBook.id === id);
    cartBooks.push({
      item,
      numberOfUnits: 1
    });
    renderCartItems(); // Remove the parameter
  }
}

function renderCartItems() {
  const cartDiv = document.getElementById("cartDiv");
  cartDiv.innerHTML = "";
  console.log(cartBooks);
  
  cartBooks.forEach((book) => {
    const cartBookDiv = document.createElement("div");
    cartBookDiv.classList.add("book");
    cartBookDiv.innerHTML = `
          <img src="${book.image}">
          <p id="warning">${
            book.pages > 500 ? "Warning: Book has over 500 pages" : ""
          }</p>
          <h2>${book.title}</h2>
          <p>${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <p><strong>Year:</strong> ${book.year}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Publisher:</strong> ${book.publisher}</p>
          <p><strong>Description:</strong> ${book.description}</p>
          <p><strong>Price:</strong> $${book.price}</p>
          <p><strong>Quantity:</strong> ${book.numberOfUnits}</p>`;
          console.log(globalBooks)
    cartDiv.appendChild(cartBookDiv);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", fetchBooks);

function displayCart(){
  if(cartDiv.style.zIndex <= 0){
    cartDiv.style.zIndex = 1
    cartDiv.style.visibility= "visible";
  }else{
    cartDiv.style.zIndex = -1
    cartDiv.style.visibility= "hidden";
  }
}