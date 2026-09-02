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

    const guestName = String(payload.guest_name || payload.name || 'Guest').trim();
    const guestNameParts = guestName ? guestName.split(/\s+/) : ['Guest'];
    const guestNameText = guestNameParts.join(' ');
    const phone = payload.guest_phone || payload.phone || payload.mobile || null;
    const email = payload.guest_email || payload.email || null;

    const guestResult = await client.query(
      `INSERT INTO guests (organization_id, name, mobile, email, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
      [payload.organization_id || 1, guestNameText || 'Guest', phone, email]
    );

    const bookingNumber = `BK${Date.now()}`;
    const totalAmount = Number(payload.total_amount ?? payload.total ?? 0);
    const advanceAmount = Number(payload.advance_amount ?? payload.advance ?? 0);
    const paidAmount = Number(payload.paid_amount ?? advanceAmount ?? 0);
    const balanceAmount = Math.max(totalAmount - paidAmount, 0);
    const paymentStatus = String(payload.payment_status || payload.status || (advanceAmount > 0 ? 'PARTIAL' : 'PENDING')).toUpperCase();
    const bookingStatus = String(payload.booking_status || payload.status || 'CONFIRMED').toUpperCase();

    const bookingResult = await client.query(
      `INSERT INTO bookings (
        organization_id, hotel_id, branch_id, booking_number, guest_id, check_in_date, check_out_date,
        adults, children, booking_source, status, subtotal, discount, tax, total, advance_amount,
        paid_amount, balance_amount, notes, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW()) RETURNING *`,
      [
        payload.organization_id || 1,
        payload.hotel_id || 1,
        payload.branch_id || 1,
        bookingNumber,
        guestResult.rows[0].id,
        payload.check_in_date,
        payload.check_out_date,
        Number(payload.adults || 1),
        Number(payload.children || 0),
        payload.booking_source || 'WALK_IN',
        bookingStatus,
        totalAmount,
        0,
        0,
        totalAmount,
        advanceAmount,
        paidAmount,
        balanceAmount,
        payload.notes || null,
      ]
    );

    await client.query('COMMIT');
    return {
      ...bookingResult.rows[0],
      payment_status: paymentStatus,
    };
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
    const mappedKey = key === 'payment_status' ? 'status' : key;
    setClauses.push(`${mappedKey} = $${index}`);
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
