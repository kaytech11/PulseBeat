import { Router } from "express";

import {
  uploadSongs,getSongs,deleteSongs,updateSongs,streamSongs,getTrendingSongs
} from "../controllers/song.controller";

import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();


/**
 * @swagger
 * /songs/upload:
 *   post:
 *     summary: Upload a song
 *     tags:
 *       - Songs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Song uploaded successfully
 */

// Upload song (ARTIST only)
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("ARTIST"),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  uploadSongs
);

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Get all songs
 *     tags:
 *       - Songs
 *     responses:
 *       200:
 *         description: Songs retrieved successfully
 */

// Public routes
router.get("/", getSongs);

/**
 * @swagger
 * /songs/trending:
 *   get:
 *     summary: Get trending songs
 *     tags:
 *       - Songs
 *     responses:
 *       200:
 *         description: Trending songs retrieved
 */

router.get("/trending", getTrendingSongs);

/**
 * @swagger
 * /songs/stream/{id}:
 *   get:
 *     summary: Stream a song
 *     tags:
 *       - Songs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx123abc456
 *     responses:
 *       200:
 *         description: Song stream retrieved
 */

router.get("/stream/:id", streamSongs);

/**
 * @swagger
 * /songs/{id}:
 *   put:
 *     summary: Update a song
 *     tags:
 *       - Songs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx123abc456
 *     responses:
 *       200:
 *         description: Song updated successfully
 */

// Protected artist routes
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ARTIST"),
  updateSongs
);


/**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     summary: Delete a song
 *     tags:
 *       - Songs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx123abc456
 *     responses:
 *       200:
 *         description: Song deleted successfully
 */

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ARTIST"),
  deleteSongs
);

export default router;

// GET /api/songs
// POST /api/songs/upload
// PUT /api/songs/:id
// DELETE /api/songs/:id
// GET /api/songs/stream/:id
// GET /api/songs/trending