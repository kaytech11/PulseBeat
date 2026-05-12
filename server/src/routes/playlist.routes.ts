import { Router } from "express";

import  authMiddleware from "../middleware/auth.middleware";


import {
    createPlaylist,
    getUserPlaylists,
    addSongToPlaylist
} from "../controllers/playlist.controller";


const router = Router();

router.post(
    "/",
    authMiddleware,
    createPlaylist
);

router.get(
    "/",
    authMiddleware,
    getUserPlaylists
);

router.post(
    "/:playlistId/songs/:songId",
    authMiddleware,
    addSongToPlaylist
);
export default router;