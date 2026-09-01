import { Router } from 'express';
import {
  getDashboardSummary,
  getOccupancyReport,
  getRevenueReport,
} from '../controllers/reports.controller';

const router = Router();

router.get('/dashboard', getDashboardSummary);
router.get('/occupancy', getOccupancyReport);
router.get('/revenue', getRevenueReport);

export default router;
