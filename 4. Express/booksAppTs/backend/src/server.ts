import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { readFileSync } from 'fs'
import cors from "cors"
import { fetchBooks } from './books'


dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE"],
}))

app.use(express.json())

const _dirname = path.resolve()
let booksData;

try {
  const rawData = readFileSync(path.join(_dirname, "db", "db.json"), "utf-8");
  booksData = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading books data:', error);
  booksData = [];
}

app.get('/api/booksData', (req, res) => {
  res.json(booksData);
});

let filteredBooks;
app.get('/api/booksFilter', (req, res) => {
  try {
      const {id, title, author, genre, pages } = req.query

      //on the first filters, the whole evets havent been filtered
      filteredBooks = [...booksData]

      //filtering logic
      if(id) {
        filteredBooks = filteredBooks.filter((book) => book.id.includes((id as string)))
    }
      if(title) {
          filteredBooks = filteredBooks.filter((book) => book.title.toLowerCase().includes((title as string).toLowerCase()))
      }
      if(author) {
        filteredBooks = filteredBooks.filter((book) => book.author.toLowerCase().includes((author as string).toLowerCase()))
      }
      if(genre) {
        filteredBooks = filteredBooks.filter((book) => book.genre.toLowerCase().includes((genre as string).toLowerCase()))
      }
      if(pages) {
        filteredBooks = filteredBooks.filter((book) => book.pages.includes((pages as string)))
    }
      // if(price) {
      //     const priceNum = parseFloat(price as string)
      //     filteredBooks = filteredBooks.filter((book) => book.price === priceNum)
      // }


      res.json(filteredBooks)
  } catch (error) {
      
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});