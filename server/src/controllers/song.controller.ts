import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import uploadToCloudinary from "../utils/uploadToCloudinary";
import Busboy from "busboy";
import { Readable } from "stream";

// Upload Song
export const uploadSongs = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        files: 2,
      },
    });

    let title = "";
    let artist = "";

    let audioUrl: string | null = null;
    let coverImageUrl: string | null = null;

    let audioUpload: Promise<string> | null = null;
    let coverUpload: Promise<string> | null = null;

    busboy.on("field", (fieldname, value) => {
      if (fieldname === "title") {
        title = value;
      }

      if (fieldname === "artist") {
        artist = value;
      }
    });

    busboy.on("file", (fieldname, file, info) => {
      const { filename, mimeType } = info;

      console.log("Receiving file:", {
        fieldname,
        filename,
        mimeType,
      });

      if (fieldname === "audio") {
        audioUpload = uploadToCloudinary(
          file as Readable,
          "pulsebeat/audio",
          "video"
        );
      }

      if (fieldname === "cover") {
        coverUpload = uploadToCloudinary(
          file as Readable,
          "pulsebeat/covers",
          "image"
        );
      }
    });

    busboy.on("error", (error) => {
      console.error("Busboy error:", error);

      if (!res.headersSent) {
        res.status(400).json({
          message: "Failed to process uploaded files",
        });
      }
    });

    busboy.on("finish", async () => {
      try {
        if (!title || !artist || !audioUpload) {
          return res.status(400).json({
            message: "Title, artist and audio file are required",
          });
        }

        // Wait for audio upload
        audioUrl = await audioUpload;

        // Wait for cover upload if provided
        if (coverUpload) {
          coverImageUrl = await coverUpload;
        }

        // Save song to database
        const song = await prisma.song.create({
          data: {
            title,
            artist,
            audioUrl,
            coverImage: coverImageUrl,
            userId: req.user!.id,
          },
        });

        return res.status(201).json({
          message: "Song uploaded successfully",
          song,
        });
      } catch (error) {
        console.error("Cloudinary upload error:", error);

        if (!res.headersSent) {
          return res.status(500).json({
            message: "Failed to upload song",
          });
        }
      }
    });

    req.pipe(busboy);
  } catch (error) {
    console.error("Upload song error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// Get All Songs
export const getSongs = async (
    _req: Request,
    res: Response
) => {
    try {
        const songs = await prisma.song.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};


// Update Song
export const updateSongs = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { id } = req.params as { id: string };

        const song = await prisma.song.findUnique({
            where: { id },
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }

        // Ownership check
        if (song.userId !== req.user?.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        const updatedSong = await prisma.song.update({
            where: { id },
            data: {
                ...(req.body.title && { title: req.body.title }),
                ...(req.body.artist && { artist: req.body.artist }),
            }
        });

        res.status(200).json({
            message: "Song updated",
            updatedSong,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};


// Delete Song
export const deleteSongs = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { id } = req.params as { id: string };

        const song = await prisma.song.findUnique({
            where: { id },
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }

        // Ownership check
        if (song.userId !== req.user?.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        await prisma.song.delete({
            where: { id },
        });

        res.status(200).json({
            message: "Song deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};


// Stream Song
export const streamSongs = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params as { id: string };

        const song = await prisma.song.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
            }
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }  

        // Increment play count
        const updatedSong = await prisma.song.update({
            where: { id },
            data: {
                playCount: {
                    increment: 1,
                },
            },
        });

        res.status(200).json({
            message: "Streaming song",
            song:{
                id: song.id,
                title: song.title,
                artist: song.artist,
                audioUrl: song.audioUrl,
                coverImage: song.coverImage,
                uploadedBy: song.user.username,
                createdAt: song.createdAt,
                playCount: updatedSong.playCount,
            },
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: "Server error",
        });
    }
};

// trending songs 
export const getTrendingSongs = async (
  _req: Request,
  res: Response
) => {
  try {
    const songs = await prisma.song.findMany({
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

    res.status(200).json({
      songs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};