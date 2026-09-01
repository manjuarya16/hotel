import type { Request, Response } from 'express';
import * as maintenanceService from '../services/maintenance.service';

export const getAllMaintenances = async (_req: Request, res: Response) => {
  try {
    const maintenance = await maintenanceService.findAll();
    return res.json({ data: maintenance });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getMaintenanceById = async (req: Request, res: Response) => {
  try {
    const maintenance = await maintenanceService.findById(Number(req.params.id));
    if (!maintenance) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }
    return res.json(maintenance);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await maintenanceService.create(req.body);
    return res.status(201).json(maintenance);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await maintenanceService.update(Number(req.params.id), req.body);
    if (!maintenance) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }
    return res.json({ success: true, data: maintenance });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteMaintenance = async (req: Request, res: Response) => {
  try {
    const deleted = await maintenanceService.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }
    return res.json({ success: true, message: 'Maintenance request deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
