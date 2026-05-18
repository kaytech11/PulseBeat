"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const playlist_controller_1 = require("../controllers/playlist.controller");
const router = (0, express_1.Router)();
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
router.post("/", auth_middleware_1.default, playlist_controller_1.createPlaylist);
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
router.get("/", auth_middleware_1.default, playlist_controller_1.getUserPlaylists);
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
router.post("/:playlistId/songs/:songId", auth_middleware_1.default, playlist_controller_1.addSongToPlaylist);
exports.default = router;
