import type { Request, Response } from 'express';
import * as bookingsService from '../services/bookings.service';

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 10);
    const offset = Number(req.query.offset || 0);
    const result = await bookingsService.findAll(limit, offset);
    return res.json({ data: result.rows, total: result.rowCount });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await bookingsService.findById(Number(req.params.id));
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingsService.create(req.body);
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingsService.update(Number(req.params.id), req.body);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deleted = await bookingsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
