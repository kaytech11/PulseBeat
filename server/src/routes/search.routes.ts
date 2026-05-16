import { Router } from 'express';
import { searchSongs } from '../controllers/search.controller';

const router = Router();

// Search songs

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search songs and artists
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           example: burna
 *     responses:
 *       200:
 *         description: Search results retrieved
 */

router.get('/', searchSongs);

export default router;