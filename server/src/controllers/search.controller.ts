import { Request, Response } from "express";

import prisma from "../config/prisma";

export const searchSongs = async (
  req: Request,
  res: Response
) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const songs = await prisma.song.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            artist: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
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
    });

    res.status(200).json({
      results: songs.length,
      songs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};