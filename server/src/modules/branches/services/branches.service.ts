import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM branches ORDER BY name ASC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM branches WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO branches (hotel_id, name, code, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [payload.hotel_id || 1, payload.name, payload.code || payload.name?.slice(0, 3).toUpperCase(), payload.status || 'ACTIVE']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE branches SET name = COALESCE($1, name), code = COALESCE($2, code), status = COALESCE($3, status), updated_at = NOW() WHERE id = $4 RETURNING *`,
    [payload.name, payload.code, payload.status, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM branches WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
