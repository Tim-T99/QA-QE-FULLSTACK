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

function addToCart(id) {
  const book = globalBooks.at(id - 1);
  console.log(book);

  // Find if the book is already in cartBooks
  const existingBook = cartBooks.find(item => item.id === book.id);

  if (existingBook) {
    // If book exists, increase quantity
    existingBook.quantity += 1;
  } else {
    // If book does not exist, add it with quantity 1
    cartBooks.push({ ...book, quantity: 1 });
  }

  console.log(cartBooks);
  renderCartItems(cartBooks);
}


function renderCartItems(cartBooks) {
  const cartDiv = document.getElementById("cartDiv");
  cartDiv.innerHTML = "";
  
  cartBooks.forEach((item) => {
    const cartBookDiv = document.createElement("div");
    cartBookDiv.classList.add("book");
    cartBookDiv.innerHTML = `
          <img src="${item.image}">
          <p id="warning">${
            item.pages > 500 ? "Warning: Book has over 500 pages" : ""
          }</p>
          <h2>${item.title}</h2>
          <p>${item.author}</p>
          <p><strong>Genre:</strong> ${item.genre}</p>
          <p><strong>Year:</strong> ${item.year}</p>
          <p><strong>Pages:</strong> ${item.pages}</p>
          <p><strong>Publisher:</strong> ${item.publisher}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Price:</strong> $${item.price}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>`;
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

const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear All";
  clearBtn.onclick = () => {
    // Clear the cartBooks array and re-render the cart
    cartBooks.length = 0;
    renderCartItems(cartBooks);
  };
  cartDiv.appendChild(clearBtn);

  // Create and append the "Close" button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => {
    // Hide the cartDiv
    cartDiv.style.zIndex = -1;
    cartDiv.style.visibility = "hidden";
  };
  cartDiv.appendChild(closeBtn);
