type Book = {
  id: string,
  title: string,
  author: string,
  genre: string,
  year: number,
  pages: number,
  publisher: string,
  description: string,
  image: string,
  price: number,
  quantity?: null
}

type BooksArray = Book[]

export {Book, BooksArray}

  