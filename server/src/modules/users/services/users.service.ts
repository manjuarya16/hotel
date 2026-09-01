import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO users (organization_id, hotel_id, branch_id, first_name, last_name, email, phone, role_id, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *`,
    [payload.organization_id || 1, payload.hotel_id || 1, payload.branch_id || 1, payload.first_name || '', payload.last_name || '', payload.email || null, payload.phone || null, payload.role_id || null, payload.status || 'ACTIVE']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), phone = COALESCE($4, phone), status = COALESCE($5, status), updated_at = NOW() WHERE id = $6 RETURNING *`,
    [payload.first_name, payload.last_name, payload.email, payload.phone, payload.status, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
