import { Router } from 'express';
import {
  getAllCheckouts,
  getCheckoutById,
  createCheckout,
  updateCheckout,
  deleteCheckout,
} from '../controllers/checkouts.controller';

const router = Router();

router.get('/', getAllCheckouts);
router.get('/:id', getCheckoutById);
router.post('/', createCheckout);
router.put('/:id', updateCheckout);
router.delete('/:id', deleteCheckout);

export default router;
