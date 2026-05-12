import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";


// Personalized Home Feed
export const getHomeFeed = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    // Trending Songs
    const trending = await prisma.song.findMany({
      orderBy: {
        playCount: "desc",
      },

      take: 10,

      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });



    // Recently Played
    const recentlyPlayed = await prisma.recentlyPlayed.findMany({
      where: {
        userId: req.user!.id,
      },

      include: {
        song: true,
      },

      orderBy: {
        playedAt: "desc",
      },

      take: 10,
    });



    // Liked Songs
    const likedSongs = await prisma.like.findMany({
      where: {
        userId: req.user!.id,
      },

      include: {
        song: true,
      },

      take: 10,
    });



    // Followed Artists
    const followedArtists = await prisma.follow.findMany({
      where: {
        followerId: req.user!.id,
      },

      select: {
        artistId: true,
      },
    });

    const artistIds = followedArtists.map(
      (follow) => follow.artistId
    );



    // Songs from followed artists
    const followingFeed = await prisma.song.findMany({
      where: {
        userId: {
          in: artistIds,
        },
      },

      include: {
        user: {
          select: {
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,
    });



    // New Releases
    const newReleases = await prisma.song.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            username: true,
          },
        },
      },

      take: 10,
    });



    res.status(200).json({
      trending,
      recentlyPlayed,
      likedSongs,
      followingFeed,
      newReleases,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};