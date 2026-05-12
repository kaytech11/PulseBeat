import { Router } from "express";

import {
  uploadSongs,getSongs,deleteSongs,updateSongs,streamSongs,getTrendingSongs
} from "../controllers/song.controller";

import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

// Upload song (ARTIST only)
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("ARTIST"),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  uploadSongs
);

// Public routes
router.get("/", getSongs);
router.get("/trending", getTrendingSongs);
router.get("/stream/:id", streamSongs);

// Protected artist routes
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ARTIST"),
  updateSongs
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ARTIST"),
  deleteSongs
);

export default router;

// GET /api/songs
// POST /api/songs/upload
// PUT /api/songs/:id
// DELETE /api/songs/:id
// GET /api/songs/stream/:id
// GET /api/songs/trending