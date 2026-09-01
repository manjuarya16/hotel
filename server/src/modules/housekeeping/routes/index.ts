import { Router } from 'express';
import {
  getAllHousekeepingTasks,
  getHousekeepingTaskById,
  createHousekeepingTask,
  updateHousekeepingTask,
  deleteHousekeepingTask,
} from '../controllers/housekeeping.controller';

const router = Router();

router.get('/', getAllHousekeepingTasks);
router.get('/:id', getHousekeepingTaskById);
router.post('/', createHousekeepingTask);
router.put('/:id', updateHousekeepingTask);
router.delete('/:id', deleteHousekeepingTask);

export default router;
