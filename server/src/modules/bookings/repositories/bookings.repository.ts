import pool from '../../../config/database';

export const findAll = async (limit: number, offset: number) => {
  return pool.query(
    `
      SELECT
        b.id,
        b.booking_number,
        g.name AS guest_name,
        r.room_number,
        rt.name AS room_type,
        b.check_in_date,
        b.check_out_date,
        b.paid_amount,
        b.balance_amount,
        CASE
          WHEN b.balance_amount > 0 AND b.paid_amount > 0 THEN 'PARTIAL'
          WHEN b.balance_amount = 0 AND b.paid_amount > 0 THEN 'PAID'
          ELSE 'PENDING'
        END AS payment_status,
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
        g.name AS guest_name,
        g.email,
        g.mobile AS phone,
        CASE
          WHEN b.balance_amount > 0 AND b.paid_amount > 0 THEN 'PARTIAL'
          WHEN b.balance_amount = 0 AND b.paid_amount > 0 THEN 'PAID'
          ELSE 'PENDING'
        END AS payment_status
      FROM bookings b
      LEFT JOIN guests g ON g.id = b.guest_id
      WHERE b.id = $1
    `,
    [id]
  );
};
