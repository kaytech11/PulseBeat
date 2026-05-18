"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const follow_controller_1 = require("../controllers/follow.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /follows/{artistId}:
 *   post:
 *     summary: Follow an artist
 *     tags:
 *       - Follows
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: string
 *           example: artist123
 *     responses:
 *       201:
 *         description: Artist followed successfully
 */
router.post("/:artistId", auth_middleware_1.default, follow_controller_1.followArtist);
/**
 * @swagger
 * /follows/{artistId}:
 *   delete:
 *     summary: Unfollow an artist
 *     tags:
 *       - Follows
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: string
 *           example: artist123
 *     responses:
 *       200:
 *         description: Artist unfollowed successfully
 */
router.delete("/:artistId", auth_middleware_1.default, follow_controller_1.unfollowArtist);
/**
 * @swagger
 * /follows:
 *   get:
 *     summary: Get followed artists
 *     tags:
 *       - Follows
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Followed artists retrieved
 */
router.get("/", auth_middleware_1.default, follow_controller_1.getFollowedArtists);
exports.default = router;
