import type { Request, Response } from 'express';
import * as facilitiesService from '../services/facilities.service';

export const getAllFacilities = async (_req: Request, res: Response) => {
  try {
    const facilities = await facilitiesService.findAll();
    return res.json({ data: facilities });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createFacility = async (req: Request, res: Response) => {
  try {
    const facility = await facilitiesService.create(req.body);
    return res.status(201).json(facility);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateFacility = async (req: Request, res: Response) => {
  try {
    const facility = await facilitiesService.update(Number(req.params.id), req.body);
    if (!facility) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    return res.json({ success: true, data: facility });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteFacility = async (req: Request, res: Response) => {
  try {
    const deleted = await facilitiesService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    return res.json({ success: true, message: 'Facility deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
