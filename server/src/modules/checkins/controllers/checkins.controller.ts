import type { Request, Response } from 'express';
import * as checkinsService from '../services/checkins.service';

export const getAllCheckins = async (_req: Request, res: Response) => {
  try {
    const checkins = await checkinsService.findAll();
    return res.json({ data: checkins });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getCheckinById = async (req: Request, res: Response) => {
  try {
    const checkin = await checkinsService.findById(Number(req.params.id));
    if (!checkin) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    return res.json(checkin);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createCheckin = async (req: Request, res: Response) => {
  try {
    const checkin = await checkinsService.create(req.body);
    return res.status(201).json(checkin);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCheckin = async (req: Request, res: Response) => {
  try {
    const checkin = await checkinsService.update(Number(req.params.id), req.body);
    if (!checkin) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    return res.json({ success: true, data: checkin });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteCheckin = async (req: Request, res: Response) => {
  try {
    const deleted = await checkinsService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Check-in not found' });
    }
    return res.json({ success: true, message: 'Check-in deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
