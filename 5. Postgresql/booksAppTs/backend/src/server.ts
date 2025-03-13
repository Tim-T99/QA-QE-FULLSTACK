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

app.put('/api/bookUpdate/:id', async(req, res) => {
  try {
    const {id} =req.params

      const checkBook = await pool.query("SELECT * FROM public.books WHERE id = $1", [id])
      if (checkBook.rows.length === 0) {
          res.status(400).json({ message: "Book not found" });
          return
     } 
  } catch (error) {
    
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
