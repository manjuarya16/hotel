import { Router } from 'express';
import {
  getAllCheckins,
  getCheckinById,
  createCheckin,
  updateCheckin,
  deleteCheckin,
} from '../controllers/checkins.controller';

const router = Router();

router.get('/', getAllCheckins);
router.get('/:id', getCheckinById);
router.post('/', createCheckin);
router.put('/:id', updateCheckin);
router.delete('/:id', deleteCheckin);

export default router;
