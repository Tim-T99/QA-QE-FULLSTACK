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
      <button class="buy-button">Buy Now</button>
      <button class="delete-button" data-id="${book.id}">Delete</button>
    `;
    
    booksList.appendChild(bookDiv);
    bookDiv.querySelector(".buy-button")?.addEventListener("click", () => addToCart(book.id));
    bookDiv.querySelector(".delete-button")?.addEventListener("click", () => handleDelete(book.id));
  });
};

// Add delete handler
async function handleDelete(id: number): Promise<void> {
  if (confirm('Are you sure you want to delete this book?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/bookDelete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Remove from globalBooks if it exists there
        globalBooks = globalBooks.filter(book => book.id !== id);
        // Remove from cart if it exists there
        cartBooks = cartBooks.filter(book => book.id !== id);
        // Refresh display
        updateBookDisplay();
        renderCartItems(cartBooks);
      } else {
        alert(data.message || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Server error - please try again later');
    }
  }
}

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

document.getElementById("closeBtn")?.addEventListener("click", () => {
  const formDiv = document.getElementById("formDiv");
  if (formDiv) {
    formDiv.style.visibility = "hidden";
    formDiv.style.opacity = "0";
  }
});
//book form functionality
document.getElementById("add-book")?.addEventListener("click", displayForm);

function displayForm(): void {
  const formDiv = document.getElementById("formDiv");
  if (!formDiv) return;

  const isHidden = formDiv.style.visibility === "hidden" || formDiv.style.opacity === "0";
  formDiv.style.visibility = isHidden ? "visible" : "hidden";
  formDiv.style.opacity = isHidden ? "1" : "0";
  formDiv.style.zIndex = isHidden ? "20" : "-1"

}

// Add book using form
document.addEventListener('DOMContentLoaded', () => {
  // Type the elements correctly with null checks
  const form = document.getElementById('inputForm') as HTMLFormElement | null;
  const clearBtn = document.getElementById('clear-form') as HTMLButtonElement | null;

  // Check if form exists before adding event listener
  if (!form) {
    console.error('Form element not found');
    return;
  }

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data with proper typing
    const formData = {
      image: (document.getElementById('bookImage') as HTMLInputElement).value,
      title: (document.getElementById('bookTitle') as HTMLInputElement).value,
      author: (document.getElementById('bookAuthor') as HTMLInputElement).value,
      genre: (document.getElementById('bookGenre') as HTMLInputElement).value,
      year: (document.getElementById('bookYear') as HTMLInputElement).value,
      pages: (document.getElementById('bookPages') as HTMLInputElement).value,
      publisher: (document.getElementById('bookPublisher') as HTMLInputElement).value,
      price: (document.getElementById('bookPrice') as HTMLInputElement).value,
      description: (document.getElementById('bookDescription') as HTMLTextAreaElement).value,
    };

    try {
      // Send data to the server
      const response = await fetch('http://localhost:3000/api/booksPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create book');
      }

      const result = await response.json();
      console.log(result); // Log success message
      form.reset(); // Clear the form after successful submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit book. Please try again.');
    }
  });

  // Handle clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent any default behavior
      form.reset(); // Clear all form fields
    });
  } else {
    console.error('Clear button not found');
  }
  
});

const postBtn = document.getElementById('post') as HTMLButtonElement;
postBtn.disabled = true;
try {
  // fetch request
} finally {
  postBtn.disabled = false;
}

    // document.getElementById('add-book').addEventListener('submit', async (event) => {
    //   event.preventDefault(); // Prevent form from refreshing the page

    //   const formData = new FormData(event.target);
    //   const bookData = {
    //     title: formData.get('bookTitle'),
    //     author: formData.get('bookAuthor'),
    //     genre: formData.get('bookGenre'),
    //     year: formData.get('bookYear'),
    //     pages: formData.get('bookPages'),
    //     publisher: formData.get('bookPublisher'),
    //     description: formData.get('bookDescription'),
    //     image: formData.get('bookImage'),
    //     price: formData.get('bookPrice'),
    //   };

    //   try {
    //     const response = await fetch('http://localhost:3000/api/booksPost', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(bookData),
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to add book');
    //     }

    //     const result = await response.json();
    //     console.log('Book added:', result);
    //     alert('Book added successfully!');
    //     event.target.reset(); // Clear the form
    //   } catch (error) {
    //     console.error('Error:', error);
    //     alert('Error adding book: ' + error.message);
    //   }
    // });
