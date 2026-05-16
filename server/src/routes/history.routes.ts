import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { addToHistory, getRecentlyPlayed } from '../controllers/history.conrtoller';

const router = Router();
/**
 * @swagger
 * /history/{songId}:
 *   post:
 *     summary: Add song to recently played
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *           example: song123
 *     responses:
 *       201:
 *         description: Song added to history
 */

router.post('/:songId', authMiddleware, addToHistory);

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get recently played songs
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recently played songs retrieved
 */

router.get('/', authMiddleware, getRecentlyPlayed);

export default router;