export interface Book {
  id: number,
  title: string,
  author: string,
  genre: string,
  year: number,
  pages: number,
  publisher: string,
  description: string,
  image: string,
  price: number,
  quantity?: number
  // Add other properties as needed
}
export type BooksArray = Book[]



  