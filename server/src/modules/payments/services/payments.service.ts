import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO payments (booking_id, guest_id, payment_method, amount, payment_status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
    [payload.booking_id || null, payload.guest_id || null, payload.payment_method || 'CASH', Number(payload.amount || 0), payload.payment_status || 'PENDING']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE payments SET payment_method = COALESCE($1, payment_method), amount = COALESCE($2, amount), payment_status = COALESCE($3, payment_status), updated_at = NOW() WHERE id = $4 RETURNING *`,
    [payload.payment_method, Number(payload.amount), payload.payment_status, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM payments WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
