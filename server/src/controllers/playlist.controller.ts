import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// Create Playlist
export const createPlaylist = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Playlist name is required",
            });
        }

        const playlist = await prisma.playlist.create({
            data: {
                name,
                description,
                userId: req.user!.id,
            },
        });

        res.status(201).json({
            message: "Playlist created successfully",
            playlist,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


//Get user playlists

export const getUserPlaylists = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                userId: req.user!.id,
            },
            include: {
                songs: {
                    include: {
                        song: true,
                    }
                }
            }
        });

        res.status(200).json({
            message: "User playlists retrieved successfully",
            playlists,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};


// Add Song to Playlist
export const addSongToPlaylist = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { playlistId, songId } = req.params as {
            playlistId: string;
            songId: string;
        };

        // find playlist
        const playlist = await prisma.playlist.findUnique({
            where: { id: playlistId },
        });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        // ownership check
        if (playlist.userId !== req.user?.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        // check song exists
        const song = await prisma.song.findUnique({
            where: { id: songId },
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }

        // prevent duplicates
        const existingSong = await prisma.playlistSong.findUnique({
            where: {
                playlistId_songId: {
                    playlistId,
                    songId,
                },
            },
        });

        if (existingSong) {
            return res.status(400).json({
                message: "Song already in playlist",
            });
        }

        await prisma.playlistSong.create({
            data: {
                playlistId,
                songId,
            },
        });

        res.status(200).json({
            message: "Song added to playlist",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

// delete song from playlist
export const removeSongFromPlaylist = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { playlistId, songId } = req.params as {
            playlistId: string;
            songId: string;
        };

        const playlist = await prisma.playlist.findUnique({
            where: {
                id: playlistId,
            },
        });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.userId !== req.user?.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        await prisma.playlistSong.delete({
            where: {
                playlistId_songId: {
                    playlistId,
                    songId,
                },
            },
        });

        res.status(200).json({
            message: "Song removed from playlist",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// delete playlist 
export const deletePlaylist = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { playlistId } = req.params as {
            playlistId: string;
        };

        const playlist = await prisma.playlist.findUnique({
            where: {
                id: playlistId,
            },
        });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.userId !== req.user?.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        await prisma.playlist.delete({
            where: {
                id: playlistId,
            },
        });

        return res.status(200).json({
            message: "Playlist deleted successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// update playlist
export const updatePlaylist = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { playlistId } = req.params as {
            playlistId: string;
        };
        const { name, description } = req.body;

        const playlist = await prisma.playlist.findUnique({
            where: {
                id: playlistId,
            },
        });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.userId !== req.user?.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        const updatedPlaylist = await prisma.playlist.update({
            where: {
                id: playlistId,
            },
            data: {
                name,
                description,
            },
        });

        res.status(200).json({
            message: "Playlist updated successfully",
            playlist: updatedPlaylist,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};