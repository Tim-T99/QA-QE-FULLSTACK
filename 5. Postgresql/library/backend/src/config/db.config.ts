import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Pool instance with the database configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Ensure this is a number
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection (optional but recommended)
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database successfully');
  release(); // Release the client back to the pool
});

export default pool;