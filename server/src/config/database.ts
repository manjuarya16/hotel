import dotenv from 'dotenv';
import { Pool, type QueryResultRow } from 'pg';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'root',
  database: process.env.PGDATABASE || 'hotel',
});

export const query = <T extends QueryResultRow = QueryResultRow>(text: string, params?: any[]) =>
  pool.query<T>(text, params);

export default pool;
