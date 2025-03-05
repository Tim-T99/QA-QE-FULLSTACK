import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { readFileSync } from 'fs';
import cors from 'cors';

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  image: string;
  price: number;
  quantity?: number;
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", // Adjust if your frontend port differs
  methods: ["GET", "PUT", "DELETE"],
}));

app.use(express.json());

const _dirname = path.resolve();
let booksData;

try {
  const rawData = readFileSync(path.join(_dirname, "db", "db.json"), "utf-8");
  booksData = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading books data:', error);
  booksData = { books: [] }; // Fallback to empty array
}

app.get('/api/booksData', (req, res) => {
  res.json(booksData);
});

app.get('/api/books', (req, res) => {
  try {
    const { genre, year } = req.query;
    let filteredBooks = [...booksData.books];

    // Filter by genre (exact match)
    if (genre && typeof genre === 'string' && genre !== "All") {
      filteredBooks = filteredBooks.filter(book =>
        book.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    // Filter by year (less than or equal to)
    if (year && typeof year === 'string') {
      const yearNum = parseInt(year, 10);
      if (!isNaN(yearNum)) {
        filteredBooks = filteredBooks.filter(book => book.year <= yearNum);
      }
    }

    res.status(200).json(filteredBooks);
  } catch (error) {
    console.error("Error filtering books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});