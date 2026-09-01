import type { Request, Response } from 'express';
import * as roomsService from './rooms.service';

export const getAllRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await roomsService.findAll();
    return res.json({ data: rooms });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateRoomStatus = async (req: Request, res: Response) => {
  try {
    const updated = await roomsService.updateStatus(Number(req.params.id), req.body.status);
    if (!updated) {
      return res.status(404).json({ error: 'Room not found' });
    }
    return res.json({ success: true, message: 'Room updated' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
