import { Router } from "express";
import { getArtistDashboard } from "../controllers/dashboard.controller";
import authMiddleware from "../middleware/auth.middleware"; 
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /dashboard/artist:
 *   get:
 *     summary: Get artist dashboard analytics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Artist dashboard retrieved
 */

router.get(
  "/artist",
  authMiddleware,
  roleMiddleware("artist"),
  getArtistDashboard
);

export default router;
