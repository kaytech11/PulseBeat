import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";


// Artist Dashboard
export const getArtistDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    // Ensure user is artist
    if (req.user?.role !== "ARTIST") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Get artist songs
    const songs = await prisma.song.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        likes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // Total uploads
    const totalSongs = songs.length;

    // Total plays
    const totalPlays = songs.reduce(
      (acc, song) => acc + song.playCount,
      0
    );

    // Total likes
    const totalLikes = songs.reduce(
      (acc, song) => acc + song.likes.length,
      0
    );

    // Followers count
    const followersCount = await prisma.follow.count({
      where: {
        artistId: req.user.id,
      },
    });

    res.status(200).json({
      artist: {
        id: req.user.id,
        role: req.user.role,
      },

      analytics: {
        totalSongs,
        totalPlays,
        totalLikes,
        followersCount,
      },

      songs,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};