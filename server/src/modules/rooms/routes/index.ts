import { Router } from 'express';
import { getAllRooms, updateRoomStatus } from '../controllers/rooms.controller';

const router = Router();

router.get('/', getAllRooms);
router.put('/:id', updateRoomStatus);

export default router;
