import type { Request, Response } from 'express';
import * as housekeepingService from '../services/housekeeping.service';

export const getAllHousekeepingTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await housekeepingService.findAll();
    return res.json({ data: tasks });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getHousekeepingTaskById = async (req: Request, res: Response) => {
  try {
    const task = await housekeepingService.findById(Number(req.params.id));
    if (!task) {
      return res.status(404).json({ error: 'Housekeeping task not found' });
    }
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createHousekeepingTask = async (req: Request, res: Response) => {
  try {
    const task = await housekeepingService.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateHousekeepingTask = async (req: Request, res: Response) => {
  try {
    const task = await housekeepingService.update(Number(req.params.id), req.body);
    if (!task) {
      return res.status(404).json({ error: 'Housekeeping task not found' });
    }
    return res.json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteHousekeepingTask = async (req: Request, res: Response) => {
  try {
    const deleted = await housekeepingService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Housekeeping task not found' });
    }
    return res.json({ success: true, message: 'Housekeeping task deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
