import pool from '../../config/database';

export const findAll = async () => {
  const result = await pool.query(`
    SELECT
      f.id,
      f.name,
      f.description,
      f.status
    FROM hotel_facilities f
    ORDER BY f.name
  `);

  return result.rows;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    'INSERT INTO hotel_facilities (hotel_id, name, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [payload.hotel_id || 1, payload.name, payload.description, 'ACTIVE']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    'UPDATE hotel_facilities SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
    [payload.name, payload.description, payload.status || 'ACTIVE', id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM hotel_facilities WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
