import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import { getHomeFeed } from "../controllers/home.controller";

const router = Router();

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get personalized home feed
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home feed retrieved successfully
 */

router.get(
  "/",
  authMiddleware,
  getHomeFeed
);

export default router;