import { Router } from "express";
import { getArtistDashboard } from "../controllers/dashboard.controller";
import authMiddleware from "../middleware/auth.middleware"; 
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

router.get(
  "/artist",
  authMiddleware,
  roleMiddleware("artist"),
  getArtistDashboard
);

export default router;
