let globalBooks = [];

async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    globalBooks = await response.json();
    
    displayBooks(globalBooks);
  } catch {
    alert("Cannot fetch data");
  }
}

// Display books function to reuse for filtering
function displayBooks(booksToDisplay) {
  const booksList = document.getElementById("main");
  booksList.innerHTML = "";
  
  booksToDisplay.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
          <img src = ${book.image}></img>
          <p id="warning">${
            book.pages > 500 ? "Warning: Books has over 500 pages" : ""
          }</p>
          <h2>${book.title}</h2>
          <p>${book.author}</p>
          <p>Genre: ${book.genre}</P>
          <p>Year: ${book.year}</p>
          <p>Pages: ${book.pages}</p>
          <p>Publisher: ${book.publisher}</p>
          <p>Description: ${book.description}</p>`;
    booksList.appendChild(bookDiv);
  });
}

// Improved filter function that uses global data and updates display
function filtered() {
  try {
    const inputYear = parseInt(document.getElementById("year").value);
    const filteredBooks = globalBooks.filter((book) => book.year < inputYear);
    
    displayBooks(filteredBooks);
    console.log(`Found ${filteredBooks.length} books before ${inputYear}`);
  } catch {
    console.log("Could not filter");
  }
}

function filteredGenre() {
    try {
      const inputgenre = (document.getElementById("genre").value);
      const filteredBooks = globalBooks.filter((book) => book.genre === inputgenre);
      
      displayBooks(filteredBooks);
      console.log(`Found ${filteredBooks.length} books matching ${inputgenre}`);
    } catch {
      console.log("Could not filter");
    }
  }
// Initialize on page load
document.addEventListener("DOMContentLoaded", fetchBooks);