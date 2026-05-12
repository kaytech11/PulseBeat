import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { followArtist, unfollowArtist, getFollowedArtists } from "../controllers/follow.controller";

const router = Router();

router.post(
    "/:artistId",
    authMiddleware,
    followArtist
);

router.delete(
    "/:artistId",
    authMiddleware,
    unfollowArtist
);

router.get(
    "/",
    authMiddleware,
    getFollowedArtists
);

export default router;