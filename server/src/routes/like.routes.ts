import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  likeSong,
  unlikeSong,
  getLikedSongs,
} from "../controllers/like.controller";

const router = Router();

router.post(
  "/:songId",
  authMiddleware,
  likeSong
);

router.delete(
  "/:songId",
  authMiddleware,
  unlikeSong
);

router.get(
  "/",
  authMiddleware,
  getLikedSongs
);

export default router;