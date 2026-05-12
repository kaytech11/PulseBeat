import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { addToHistory, getRecentlyPlayed } from '../controllers/history.conrtoller';

const router = Router();

router.post('/:songId', authMiddleware, addToHistory);
router.get('/', authMiddleware, getRecentlyPlayed);

export default router;