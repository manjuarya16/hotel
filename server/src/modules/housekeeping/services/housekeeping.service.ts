import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM housekeeping_tasks ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM housekeeping_tasks WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO housekeeping_tasks (room_id, task_type, status, assigned_to, notes, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
    [payload.room_id || null, payload.task_type || 'CLEANING', payload.status || 'PENDING', payload.assigned_to || null, payload.notes || '']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE housekeeping_tasks SET task_type = COALESCE($1, task_type), status = COALESCE($2, status), assigned_to = COALESCE($3, assigned_to), notes = COALESCE($4, notes), updated_at = NOW() WHERE id = $5 RETURNING *`,
    [payload.task_type, payload.status, payload.assigned_to, payload.notes, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM housekeeping_tasks WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
