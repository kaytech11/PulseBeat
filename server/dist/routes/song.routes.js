"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const song_controller_1 = require("../controllers/song.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const router = (0, express_1.Router)();
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
// router.post(
//   "/upload",
//   authMiddleware,
//   roleMiddleware("ARTIST"),
//   upload.fields([
//     { name: "audio", maxCount: 1 },
//     { name: "cover", maxCount: 1 },
//   ]),
//   uploadSongs
// );
router.post("/upload", auth_middleware_1.default, (0, role_middleware_1.default)("ARTIST"), song_controller_1.uploadSongs);
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
router.get("/", song_controller_1.getSongs);
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
router.get("/trending", song_controller_1.getTrendingSongs);
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
router.get("/stream/:id", song_controller_1.streamSongs);
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
router.put("/:id", auth_middleware_1.default, (0, role_middleware_1.default)("ARTIST"), song_controller_1.updateSongs);
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
router.delete("/:id", auth_middleware_1.default, (0, role_middleware_1.default)("ARTIST"), song_controller_1.deleteSongs);
exports.default = router;
// GET /api/songs
// POST /api/songs/upload
// PUT /api/songs/:id
// DELETE /api/songs/:id
// GET /api/songs/stream/:id
// GET /api/songs/trending
