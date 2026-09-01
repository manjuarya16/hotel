import { Router } from 'express';
import { getAllFacilities, createFacility, updateFacility, deleteFacility } from '../controllers/facilities.controller';

const router = Router();

router.get('/', getAllFacilities);
router.post('/', createFacility);
router.put('/:id', updateFacility);
router.delete('/:id', deleteFacility);

export default router;
