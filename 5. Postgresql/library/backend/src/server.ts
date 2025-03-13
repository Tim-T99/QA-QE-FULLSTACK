import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { readFileSync } from 'fs';
import cors from 'cors';
import pool from './config/db.config';
import usersRoutes from './routes/usersRoute'
import booksRoutes from './routes/booksRoute'
import borrowersRoutes from './routes/borrowersRoute'
import { notFound } from './middlewares/errorMiddlewares';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173", // Adjust if your frontend port differs
  methods: ["GET", "PUT", "DELETE", "POST"],
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/api/users", usersRoutes )
app.use("/api/books", booksRoutes )
app.use("/api/borrowers", borrowersRoutes )

app.use(notFound)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
