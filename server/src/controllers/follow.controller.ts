import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";


// Follow Artist
export const followArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { artistId } = req.params as {
      artistId: string;
    };

    // Prevent self-follow
    if (artistId === req.user!.id) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    // Check artist exists
    const artist = await prisma.user.findUnique({
      where: {
        id: artistId,
      },
    });

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    // Ensure target is artist
    if (artist.role !== "ARTIST") {
      return res.status(400).json({
        message: "You can only follow artists",
      });
    }

    // Prevent duplicates
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_artistId: {
          followerId: req.user!.id,
          artistId,
        },
      },
    });

    if (existingFollow) {
      return res.status(400).json({
        message: "Already following artist",
      });
    }

    await prisma.follow.create({
      data: {
        followerId: req.user!.id,
        artistId,
      },
    });

    res.status(201).json({
      message: "Artist followed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Unfollow Artist
export const unfollowArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { artistId } = req.params as {
      artistId: string;
    };

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_artistId: {
          followerId: req.user!.id,
          artistId,
        },
      },
    });

    if (!follow) {
      return res.status(404).json({
        message: "Follow relationship not found",
      });
    }

    await prisma.follow.delete({
      where: {
        followerId_artistId: {
          followerId: req.user!.id,
          artistId,
        },
      },
    });

    res.status(200).json({
      message: "Artist unfollowed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Get Followed Artists
export const getFollowedArtists = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const follows = await prisma.follow.findMany({
      where: {
        followerId: req.user!.id,
      },

      include: {
        artist: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(follows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Artist Followers
export const getArtistFollowers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { artistId } = req.params as {
      artistId: string;
    };

    const artist = await prisma.user.findUnique({
      where: {
        id: artistId,
      },
    });

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    const followers = await prisma.follow.findMany({
      where: {
        artistId,
      },

      include: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      count: followers.length,
      followers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};