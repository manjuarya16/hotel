import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM checkins ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM checkins WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO checkins (booking_id, guest_id, room_id, checkin_time, status, created_at)
     VALUES ($1, $2, $3, NOW(), $4, NOW()) RETURNING *`,
    [payload.booking_id || null, payload.guest_id || null, payload.room_id || null, payload.status || 'CHECKED_IN']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE checkins SET status = COALESCE($1, status), room_id = COALESCE($2, room_id), updated_at = NOW() WHERE id = $3 RETURNING *`,
    [payload.status, payload.room_id, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM checkins WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
