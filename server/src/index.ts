import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';
import pool from './config/database';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.PGDATABASE || 'hotel'}`);
});

process.on('SIGINT', async () => {
  console.log('\n📍 Shutting down...');
  await pool.end();
  process.exit(0);
});
