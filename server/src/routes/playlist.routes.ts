import { Router } from "express";

import  authMiddleware from "../middleware/auth.middleware";


import {
    createPlaylist,
    getUserPlaylists,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller";


const router = Router();

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create playlist
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Playlist created successfully
 */

router.post(
    "/",
    authMiddleware,
    createPlaylist
);

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get user playlists
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Playlists retrieved successfully
 */

router.get(
    "/",
    authMiddleware,
    getUserPlaylists
);

/**
 * @swagger
 * /playlists/{playlistId}/songs/{songId}:
 *   post:
 *     summary: Add song to playlist
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *           example: playlist123
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *           example: song456
 *     responses:
 *       201:
 *         description: Song added to playlist
 */

router.post(
    "/:playlistId/songs/:songId",
    authMiddleware,
    addSongToPlaylist
);

router.delete(
  "/:playlistId/songs/:songId",
  authMiddleware,
  removeSongFromPlaylist
);

router.delete(
  "/:playlistId",
  authMiddleware,
  deletePlaylist
);
export default router;

router.patch(
  "/:playlistId",
  authMiddleware,
  updatePlaylist
);