async function fetchBooks() {
    try {
        const response = await fetch("http://localhost:3000/books");
        const books = await response.json();
        console.log(books)

        const booksList = document.getElementById("main");
         booksList.innerHTML = '';
        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add("book")
            bookDiv.innerHTML = `
            <img src = ${book.image}></img>
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>Genre: ${book.genre}</P>
            <p>Year: ${book.year}</p>
            <p>Pages: ${book.pages}</p>
            <p>Publisher: ${book.publisher}</p>
            <p>Description: ${book.description}</p>`

            booksList.appendChild(bookDiv)
            
        });
    } catch {
        alert("Cannot fetch data")
    }
}
document.addEventListener('DOMContentLoaded', fetchBooks)