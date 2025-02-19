let globalBooks = [];
globalBooks.sort();

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

  // Sort function that can sort by year, genre, or pages
// Sort function that works with a dropdown
function sortBooks() {
    try {
      const sortBy = document.getElementById("sortOption").value;
      let sortedBooks = [...globalBooks]; // Create a copy to avoid modifying original data
      
      switch(sortBy) {
        case 'year':
          sortedBooks.sort((a, b) => a.year - b.year);
          break;
        case 'genre':
          sortedBooks.sort((a, b) => a.genre.localeCompare(b.genre));
          break;
        case 'pages':
          sortedBooks.sort((a, b) => a.pages - b.pages);
          break;
        default:
          console.log("Invalid sort criteria");
          return;
      }
      
      displayBooks(sortedBooks);
      console.log(`Books sorted by ${sortBy} in ascending order`);
    } catch {
      console.log("Could not sort books");
    }
  }


// Initialize on page load
document.addEventListener("DOMContentLoaded", fetchBooks);