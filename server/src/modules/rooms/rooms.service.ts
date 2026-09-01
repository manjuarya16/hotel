import pool from '../../config/database';

export const findAll = async () => {
  const result = await pool.query(`
    SELECT
      r.id,
      r.room_number,
      rt.name AS room_type,
      f.floor_number,
      r.status
    FROM rooms r
    LEFT JOIN room_types rt ON r.room_type_id = rt.id
    LEFT JOIN floors f ON r.floor_id = f.id
    ORDER BY r.room_number
  `);

  return result.rows;
};

export const updateStatus = async (id: number, status: string) => {
  const result = await pool.query(
    'UPDATE rooms SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [status, id]
  );

  return result.rowCount ? result.rows[0] : null;
};
