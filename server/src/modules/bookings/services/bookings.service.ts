import pool from '../../../config/database';
import * as bookingsRepository from '../repositories/bookings.repository';

export const findAll = async (limit: number, offset: number) => {
  return bookingsRepository.findAll(limit, offset);
};

export const findById = async (id: number) => {
  const result = await bookingsRepository.findById(id);
  return result.rows[0] || null;
};

export const create = async (payload: any) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const guestNameParts = String(payload.guest_name || 'Guest').split(' ');
    const firstName = guestNameParts[0] || 'Guest';
    const lastName = guestNameParts.slice(1).join(' ') || '';

    const guestResult = await client.query(
      'INSERT INTO guests (first_name, last_name, organization_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [firstName, lastName, payload.organization_id || 1]
    );

    const bookingNumber = `BK${Date.now()}`;
    const bookingResult = await client.query(
      `INSERT INTO bookings (
        organization_id, hotel_id, branch_id, booking_number, guest_id, check_in_date, check_out_date,
        adults, children, total_amount, advance_amount, paid_amount, balance_amount,
        payment_status, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW()) RETURNING *`,
      [
        payload.organization_id || 1,
        payload.hotel_id || 1,
        payload.branch_id || 1,
        bookingNumber,
        guestResult.rows[0].id,
        payload.check_in_date,
        payload.check_out_date,
        payload.adults || 1,
        payload.children || 0,
        Number(payload.total_amount || 0),
        Number(payload.advance_amount || 0),
        Number(payload.advance_amount || 0),
        Number(payload.total_amount || 0) - Number(payload.advance_amount || 0),
        payload.advance_amount ? 'PARTIAL' : 'PENDING',
        'RESERVED',
      ]
    );

    await client.query('COMMIT');
    return bookingResult.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const update = async (id: number, payload: any) => {
  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);
  if (entries.length === 0) {
    return null;
  }

  const setClauses: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const [key, value] of entries) {
    setClauses.push(`${key} = $${index}`);
    values.push(value);
    index += 1;
  }

  setClauses.push(`updated_at = NOW()`);
  values.push(id);

  const result = await pool.query(
    `UPDATE bookings SET ${setClauses.join(', ')} WHERE id = $${index}`,
    values
  );

  if (result.rowCount === 0) {
    return null;
  }

  return findById(id);
};

export const remove = async (id: number) => {
  const result = await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
