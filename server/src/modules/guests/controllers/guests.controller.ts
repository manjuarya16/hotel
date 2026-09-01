import type { Request, Response } from 'express';
import * as guestsService from '../services/guests.service';

export const getAllGuests = async (_req: Request, res: Response) => {
  try {
    const guests = await guestsService.findAll();
    return res.json({ data: guests });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getGuestById = async (req: Request, res: Response) => {
  try {
    const guest = await guestsService.findById(Number(req.params.id));
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    return res.json(guest);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createGuest = async (req: Request, res: Response) => {
  try {
    const guest = await guestsService.create(req.body);
    return res.status(201).json(guest);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateGuest = async (req: Request, res: Response) => {
  try {
    const guest = await guestsService.update(Number(req.params.id), req.body);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    return res.json({ success: true, data: guest });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteGuest = async (req: Request, res: Response) => {
  try {
    const deleted = await guestsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Guest not found' });
    }
    return res.json({ success: true, message: 'Guest deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
