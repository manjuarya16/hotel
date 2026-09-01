import pool from '../../../config/database';

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM hotels ORDER BY name ASC');
  return result.rows;
};

export const findById = async (id: number) => {
  const result = await pool.query('SELECT * FROM hotels WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const result = await pool.query(
    `INSERT INTO hotels (organization_id, name, slug, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [payload.organization_id || 1, payload.name, payload.slug || payload.name?.toLowerCase().replace(/\s+/g, '-'), payload.status || 'ACTIVE']
  );
  return result.rows[0];
};

export const update = async (id: number, payload: any) => {
  const result = await pool.query(
    `UPDATE hotels SET name = COALESCE($1, name), slug = COALESCE($2, slug), status = COALESCE($3, status), updated_at = NOW() WHERE id = $4 RETURNING *`,
    [payload.name, payload.slug, payload.status, id]
  );
  return result.rowCount ? result.rows[0] : null;
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM hotels WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
