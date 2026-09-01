import type { Request, Response } from 'express';
import * as reportsService from '../services/reports.service';

export const getDashboardSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await reportsService.getDashboardSummary();
    return res.json(summary);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getOccupancyReport = async (_req: Request, res: Response) => {
  try {
    const occupancy = await reportsService.getOccupancyReport();
    return res.json({ data: occupancy });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getRevenueReport = async (_req: Request, res: Response) => {
  try {
    const revenue = await reportsService.getRevenueReport();
    return res.json({ data: revenue });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
