import express from 'express';
import pkg from 'pg'; // Default import
import cors from 'cors';
import * as dotenv from 'dotenv';

const { Pool } = pkg; // Destructure Pool

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env['DB_USER'],
  host: process.env['DB_HOST'],
  database: process.env['DB_NAME'],
  password: process.env['DB_PASSWORD'],
  port: parseInt(process.env['DB_PORT'] || '5432', 10),
});

app.post('/api/submit', async (req, res) => {
  const { username, email, position, skills } = req.body;
  try {
    const query = `
      INSERT INTO job_applications (username, email, position, skills)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [username, email, position, JSON.stringify(skills)];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));