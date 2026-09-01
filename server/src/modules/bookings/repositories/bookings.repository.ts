import pool from '../../../config/database';

export const findAll = async (limit: number, offset: number) => {
  return pool.query(
    `
      SELECT
        b.id,
        b.booking_number,
        CONCAT(COALESCE(g.first_name, ''), ' ', COALESCE(g.last_name, '')) AS guest_name,
        r.room_number,
        rt.name AS room_type,
        b.check_in_date,
        b.check_out_date,
        b.paid_amount,
        b.balance_amount,
        b.payment_status,
        b.status
      FROM bookings b
      LEFT JOIN guests g ON g.id = b.guest_id
      LEFT JOIN booking_rooms br ON br.booking_id = b.id
      LEFT JOIN rooms r ON r.id = br.room_id
      LEFT JOIN room_types rt ON rt.id = r.room_type_id
      ORDER BY b.created_at DESC
      LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );
};

export const findById = async (id: number) => {
  return pool.query(
    `
      SELECT
        b.*,
        CONCAT(COALESCE(g.first_name, ''), ' ', COALESCE(g.last_name, '')) AS guest_name,
        g.email,
        g.phone
      FROM bookings b
      LEFT JOIN guests g ON g.id = b.guest_id
      WHERE b.id = $1
    `,
    [id]
  );
};
