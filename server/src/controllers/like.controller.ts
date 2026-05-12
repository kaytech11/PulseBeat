import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";


// Like Song
export const likeSong = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { songId } = req.params as {
      songId: string;
    };

    // Check song exists
    const song = await prisma.song.findUnique({
      where: {
        id: songId,
      },
    });

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    // Prevent duplicate likes
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_songId: {
          userId: req.user!.id,
          songId,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({
        message: "Song already liked",
      });
    }

    await prisma.like.create({
      data: {
        userId: req.user!.id,
        songId,
      },
    });

    res.status(201).json({
      message: "Song liked successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Unlike Song
export const unlikeSong = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { songId } = req.params as {
      songId: string;
    };

    const like = await prisma.like.findUnique({
      where: {
        userId_songId: {
          userId: req.user!.id,
          songId,
        },
      },
    });

    if (!like) {
      return res.status(404).json({
        message: "Like not found",
      });
    }

    await prisma.like.delete({
      where: {
        userId_songId: {
          userId: req.user!.id,
          songId,
        },
      },
    });

    res.status(200).json({
      message: "Song unliked successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Get Liked Songs
export const getLikedSongs = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: req.user!.id,
      },
      include: {
        song: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(likes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};