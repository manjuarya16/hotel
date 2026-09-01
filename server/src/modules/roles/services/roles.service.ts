import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM roles ORDER BY name ASC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO roles (name, description, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`,
    [payload.name, payload.description || '', payload.status || 'ACTIVE']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE roles SET name = COALESCE($1, name), description = COALESCE($2, description), status = COALESCE($3, status), updated_at = NOW() WHERE id = $4 RETURNING *`,
    [payload.name, payload.description, payload.status, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM roles WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
