import pool from '../../../config/database';

const normalizeEmail = (value: string) => String(value || '').trim().toLowerCase();

export const login = async (email: string, password: string) => {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '').trim();

  const userResult = await pool.query(
    `
      SELECT
        u.id,
        u.organization_id,
        u.name,
        u.email,
        u.password_hash,
        r.name AS role,
        r.code AS role_code,
        (
          SELECT uh.hotel_id
          FROM user_hotels uh
          WHERE uh.user_id = u.id
          LIMIT 1
        ) AS hotel_id,
        (
          SELECT ub.branch_id
          FROM user_branches ub
          WHERE ub.user_id = u.id
          LIMIT 1
        ) AS branch_id
      FROM users u
      LEFT JOIN user_roles ur ON ur.user_id = u.id
      LEFT JOIN roles r ON r.id = ur.role_id
      WHERE u.email = $1
      ORDER BY u.id, r.code
      LIMIT 1
    `,
    [normalizedEmail],
  );

  const user = userResult.rows[0];
  if (!user) return null;

  const valid = user.password_hash === normalizedPassword || user.password_hash === `sha256:${normalizedPassword}`;
  if (!valid) return null;

  return user;
};
