"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const like_controller_1 = require("../controllers/like.controller");
const router = (0, express_1.Router)();
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
router.post("/:songId", auth_middleware_1.default, like_controller_1.likeSong);
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
router.delete("/:songId", auth_middleware_1.default, like_controller_1.unlikeSong);
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
router.get("/", auth_middleware_1.default, like_controller_1.getLikedSongs);
exports.default = router;
