import { query } from '../../config/database';
import * as bookingsRepository from './bookings.repository';

export const getAllBookings = async (limit: number, offset: number) => {
  return bookingsRepository.findAll(limit, offset);
};

export const getBookingById = async (id: number) => {
  const result = await bookingsRepository.findById(id);
  return result.rows[0] || null;
};

export const createBooking = async (payload: any) => {
  const {
    organization_id,
    hotel_id,
    branch_id,
    guest_name,
    check_in_date,
    check_out_date,
    room_type,
    adults,
    children,
    total_amount,
    advance_amount,
  } = payload;

  const client = await query('BEGIN');
  try {
    const guestNameParts = String(guest_name || 'Guest').split(' ');
    const firstName = guestNameParts[0] || 'Guest';
    const lastName = guestNameParts.slice(1).join(' ') || '';

    const guestResult = await query(
      'INSERT INTO guests (first_name, last_name, organization_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [firstName, lastName, organization_id || 1]
    );

    const bookingNumber = `BK${Date.now()}`;
    const bookingResult = await query(
      `INSERT INTO bookings (
        organization_id, hotel_id, branch_id, booking_number, guest_id, check_in_date, check_out_date,
        adults, children, total_amount, advance_amount, paid_amount, balance_amount, payment_status, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW()) RETURNING *`,
      [
        organization_id || 1,
        hotel_id || 1,
        branch_id || 1,
        bookingNumber,
        guestResult.rows[0].id,
        check_in_date,
        check_out_date,
        adults || 1,
        children || 0,
        total_amount || 0,
        advance_amount || 0,
        advance_amount || 0,
        (Number(total_amount || 0) - Number(advance_amount || 0)),
        advance_amount ? 'PARTIAL' : 'PENDING',
        'RESERVED',
      ]
    );

    await query('COMMIT');
    return bookingResult.rows[0];
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
};

export const updateBooking = async (id: number, payload: any) => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    fields.push(`${key} = $${paramIndex}`);
    values.push(value);
    paramIndex += 1;
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await query(
    `UPDATE bookings SET ${fields.join(', ')} WHERE id = $${paramIndex}`,
    values
  );

  if (result.rowCount === 0) {
    return null;
  }

  return getBookingById(id);
};

export const deleteBooking = async (id: number) => {
  const result = await query('DELETE FROM bookings WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
