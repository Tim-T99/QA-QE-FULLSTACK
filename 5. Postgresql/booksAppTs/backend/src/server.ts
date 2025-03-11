import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { readFileSync } from 'fs';
import cors from 'cors';
import pool from '../db/db.config';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173", // Adjust if your frontend port differs
  methods: ["GET", "PUT", "DELETE", "POST"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let bookData;


app.get('/api/books', async(req, res) => {
  try {
      const result = await pool.query("SELECT * FROM public.books ORDER BY id ASC ")
      res.status(200).json(result.rows)
  } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal server error" });
  }
})

app.post('/api/booksPost', async (req, res) => {
  try {
    const { title, author, genre, year, pages, publisher, description, image, price } = req.body

    //check if book exists
    const titleCheck = await pool.query("SELECT id FROM books WHERE title = $1", [title])

    if (titleCheck.rows.length > 0) {
        res.status(400).json({
            message: "book already exists"
        })
        return
    }
    //insert book 
    const bookResult = await pool.query(
        "INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [title, author, genre, year, pages, publisher, description, image, price]
    )
    res.status(201).json({
        message: "Book successfully uploaded",
        book: bookResult.rows[0]
    })
  } catch (error) {
    console.error("Error uploading book:", error);
        res.status(500).json({ message: "Internal server error" });
  }

  bookData= req.body
  
})



app.delete('/api/bookDelete/:id', async(req, res) => {
  try {
      const {id} =req.params

      const checkBook = await pool.query("SELECT * FROM public.books WHERE id = $1", [id])
      if (checkBook.rows.length === 0) {
          res.status(400).json({ message: "Book not found" });
          return
     } 
      await pool.query("DELETE FROM public.books WHERE id = $1",[id]);
      res.json({ message: "book deleted successful" });
  
  } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal server error" });
  }
})

// app.get('/api/booksFilter', (req, res) => {
//   try {
//     const { genre, year, sort, direction } = req.query;
//     let filteredBooks = [...booksData.books];

//     // Filtering
//     if (genre && typeof genre === 'string' && genre !== "All") {
//       filteredBooks = filteredBooks.filter(book =>
//         book.genre.toLowerCase() === genre.toLowerCase()
//       );
//     }
//     if (year && typeof year === 'string') {
//       const yearNum = parseInt(year, 10);
//       if (!isNaN(yearNum)) {
//         filteredBooks = filteredBooks.filter(book => book.year <= yearNum);
//       }
//     }
  
//     // Sorting
//     if (sort && typeof sort === 'string' && direction && typeof direction === 'string') {
//       filteredBooks.sort((a, b) => {
//         const isAsc = direction === 'asc';
//         switch (sort) {
//           case 'title': return isAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
//           case 'year': return isAsc ? a.year - b.year : b.year - a.year;
//           case 'genre': return isAsc ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre);
//           case 'pages': return isAsc ? a.pages - b.pages : b.pages - a.pages;
//           default: return 0;
//         }
//       });
//     }

//     res.status(200).json(filteredBooks);
//   } catch (error) {
//     console.error("Error filtering books:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
