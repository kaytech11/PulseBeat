import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { followArtist, unfollowArtist, getFollowedArtists } from "../controllers/follow.controller";

const router = Router();

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

router.post(
    "/:artistId",
    authMiddleware,
    followArtist
);

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
router.delete(
    "/:artistId",
    authMiddleware,
    unfollowArtist
);

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
router.get(
    "/",
    authMiddleware,
    getFollowedArtists
);

export default router;