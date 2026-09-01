import type { Request, Response } from 'express';
import * as hotelsService from '../services/hotels.service';

export const getAllHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await hotelsService.findAll();
    return res.json({ data: hotels });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await hotelsService.findById(Number(req.params.id));
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.json(hotel);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await hotelsService.create(req.body);
    return res.status(201).json(hotel);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await hotelsService.update(Number(req.params.id), req.body);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.json({ success: true, data: hotel });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const deleted = await hotelsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.json({ success: true, message: 'Hotel deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
