import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  likeSong,
  unlikeSong,
  getLikedSongs,
} from "../controllers/like.controller";

const router = Router();

/**
 * @swagger
 * /likes/{songId}:
 *   post:
 *     summary: Like a song
 *     tags:
 *       - Likes
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
 *         description: Song liked successfully
 */

router.post(
  "/:songId",
  authMiddleware,
  likeSong
);

/**
 * @swagger
 * /likes/{songId}:
 *   delete:
 *     summary: Unlike a song
 *     tags:
 *       - Likes
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
 *       200:
 *         description: Song unliked successfully
 */

router.delete(
  "/:songId",
  authMiddleware,
  unlikeSong
);

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get liked songs
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liked songs retrieved
 */

router.get(
  "/",
  authMiddleware,
  getLikedSongs
);

export default router;