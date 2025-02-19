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

// New improved sort function with ascending/descending options
function sortBooks() {
  try {
    const sortBy = document.getElementById("sortOption").value;
    const sortDirection = document.getElementById("sortDirection").value;
    let sortedBooks = [...globalBooks]; // Create a copy to avoid modifying original data
    
    switch(sortBy) {
      case 'year':
        sortedBooks.sort((a, b) => sortDirection === 'asc' ? a.year - b.year : b.year - a.year);
        break;
      case 'genre':
        sortedBooks.sort((a, b) => {
          return sortDirection === 'asc' 
            ? a.genre.localeCompare(b.genre)
            : b.genre.localeCompare(a.genre);
        });
        break;
      case 'pages':
        sortedBooks.sort((a, b) => sortDirection === 'asc' ? a.pages - b.pages : b.pages - a.pages);
        break;
      case 'title':
        sortedBooks.sort((a, b) => {
          return sortDirection === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });
        break;
      default:
        console.log("Invalid sort criteria");
        return;
    }
    
    displayBooks(sortedBooks);
    console.log(`Books sorted by ${sortBy} in ${sortDirection === 'asc' ? 'ascending' : 'descending'} order`);
  } catch {
    console.log("Could not sort books");
  }
}

// Helper function to create book summary
function createBookSummary() {
  const summary = globalBooks.map((book) => 
    `${book.title} by ${book.author} - ${book.genre} (${book.pages} pages)`
  );
  console.log(summary);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", fetchBooks);