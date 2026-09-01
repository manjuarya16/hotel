import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM invoices ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM invoices WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO invoices (booking_id, guest_id, invoice_number, total_amount, balance_amount, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
    [payload.booking_id || null, payload.guest_id || null, payload.invoice_number || `INV-${Date.now()}`, Number(payload.total_amount || 0), Number(payload.balance_amount || 0), payload.status || 'DRAFT']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE invoices SET total_amount = COALESCE($1, total_amount), balance_amount = COALESCE($2, balance_amount), status = COALESCE($3, status), updated_at = NOW() WHERE id = $4 RETURNING *`,
    [Number(payload.total_amount), Number(payload.balance_amount), payload.status, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
