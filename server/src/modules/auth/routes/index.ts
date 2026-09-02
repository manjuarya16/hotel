import { Router } from 'express';
import { loginUser, getCurrentUser } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginUser);
router.get('/me', getCurrentUser);

export default router;
