"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSongToPlaylist = exports.getUserPlaylists = exports.createPlaylist = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Create Playlist
const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Playlist name is required",
            });
        }
        const playlist = await prisma_1.default.playlist.create({
            data: {
                name,
                description,
                userId: req.user.id,
            },
        });
        res.status(201).json({
            message: "Playlist created successfully",
            playlist,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.createPlaylist = createPlaylist;
//Get user playlists
const getUserPlaylists = async (req, res) => {
    try {
        const playlists = await prisma_1.default.playlist.findMany({
            where: {
                userId: req.user.id,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getUserPlaylists = getUserPlaylists;
// Add Song to Playlist
const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        // find playlist
        const playlist = await prisma_1.default.playlist.findUnique({
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
        const song = await prisma_1.default.song.findUnique({
            where: { id: songId },
        });
        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }
        // prevent duplicates
        const existingSong = await prisma_1.default.playlistSong.findUnique({
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
        await prisma_1.default.playlistSong.create({
            data: {
                playlistId,
                songId,
            },
        });
        res.status(200).json({
            message: "Song added to playlist",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.addSongToPlaylist = addSongToPlaylist;
