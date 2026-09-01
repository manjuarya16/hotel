import pool from '../../../config/database';

export const getDashboardSummary = async () => {
  const [bookings, rooms, guests, revenue] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS total FROM bookings'),
    pool.query('SELECT COUNT(*)::int AS total FROM rooms'),
    pool.query('SELECT COUNT(*)::int AS total FROM guests'),
    pool.query('SELECT COALESCE(SUM(total_amount), 0)::numeric AS total FROM bookings')
  ]);

  return {
    bookings: bookings.rows[0]?.total ?? 0,
    rooms: rooms.rows[0]?.total ?? 0,
    guests: guests.rows[0]?.total ?? 0,
    revenue: Number(revenue.rows[0]?.total ?? 0),
  };
};

export const getOccupancyReport = async () => {
  const result = await pool.query(
    `SELECT status, COUNT(*)::int AS total FROM rooms GROUP BY status ORDER BY status`
  );
  return result.rows;
};

export const getRevenueReport = async () => {
  const result = await pool.query(
    `SELECT date_trunc('day', created_at)::date AS day, COALESCE(SUM(total_amount), 0)::numeric AS revenue
     FROM bookings GROUP BY 1 ORDER BY 1 DESC LIMIT 30`
  );
  return result.rows;
};
