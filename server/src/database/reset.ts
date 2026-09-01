import dotenv from 'dotenv';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { Client } = pg;
const databaseRoot = __dirname;
const sqlDirectories = ['migrations', 'functions', 'triggers', 'seeds'];

function getRequiredResetFlag(): void {
  if (process.env.RESET_DATABASE !== 'true') {
    throw new Error(
      'Refusing to reset the database. Set RESET_DATABASE=true to confirm this destructive operation.',
    );
  }
}

async function getSqlFiles(directory: string): Promise<string[]> {
  const directoryPath = path.join(databaseRoot, directory);
  const entries = await readdir(directoryPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second, 'en'))
    .map((fileName) => path.join(directoryPath, fileName));
}

async function resetDatabase(): Promise<void> {
  getRequiredResetFlag();

  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT ?? 5432),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();

  try {
    await client.query('BEGIN');
    await client.query('DROP SCHEMA public CASCADE');
    await client.query('CREATE SCHEMA public');
    await client.query('GRANT ALL ON SCHEMA public TO public');

    for (const directory of sqlDirectories) {
      const files = await getSqlFiles(directory);

      for (const filePath of files) {
        const sql = await readFile(filePath, 'utf8');
        await client.query(sql);
        console.log(`Applied ${path.relative(databaseRoot, filePath)}`);
      }
    }

    await client.query('COMMIT');
    console.log(`Database reset complete: ${process.env.PGDATABASE}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

resetDatabase().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});