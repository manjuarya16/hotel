import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM maintenance_requests ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM maintenance_requests WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO maintenance_requests (room_id, request_type, description, status, priority, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
    [payload.room_id || null, payload.request_type || 'GENERAL', payload.description || '', payload.status || 'OPEN', payload.priority || 'MEDIUM']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE maintenance_requests SET request_type = COALESCE($1, request_type), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority), updated_at = NOW() WHERE id = $5 RETURNING *`,
    [payload.request_type, payload.description, payload.status, payload.priority, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM maintenance_requests WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
