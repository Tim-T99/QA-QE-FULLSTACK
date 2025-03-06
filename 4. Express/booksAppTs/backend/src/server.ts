import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { readFileSync } from 'fs';
import cors from 'cors';

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

app.get('/api/booksFilter', (req, res) => {
  try {
    const { genre, year, sort, direction } = req.query;
    let filteredBooks = [...booksData.books];

    // Filtering
    if (genre && typeof genre === 'string' && genre !== "All") {
      filteredBooks = filteredBooks.filter(book =>
        book.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    if (year && typeof year === 'string') {
      const yearNum = parseInt(year, 10);
      if (!isNaN(yearNum)) {
        filteredBooks = filteredBooks.filter(book => book.year <= yearNum);
      }
    }

    // Sorting
    if (sort && typeof sort === 'string' && direction && typeof direction === 'string') {
      filteredBooks.sort((a, b) => {
        const isAsc = direction === 'asc';
        switch (sort) {
          case 'title': return isAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
          case 'year': return isAsc ? a.year - b.year : b.year - a.year;
          case 'genre': return isAsc ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre);
          case 'pages': return isAsc ? a.pages - b.pages : b.pages - a.pages;
          default: return 0;
        }
      });
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