"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedSongs = exports.unlikeSong = exports.likeSong = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Like Song
const likeSong = async (req, res) => {
    try {
        const { songId } = req.params;
        // Check song exists
        const song = await prisma_1.default.song.findUnique({
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
        const existingLike = await prisma_1.default.like.findUnique({
            where: {
                userId_songId: {
                    userId: req.user.id,
                    songId,
                },
            },
        });
        if (existingLike) {
            return res.status(400).json({
                message: "Song already liked",
            });
        }
        await prisma_1.default.like.create({
            data: {
                userId: req.user.id,
                songId,
            },
        });
        res.status(201).json({
            message: "Song liked successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.likeSong = likeSong;
// Unlike Song
const unlikeSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const like = await prisma_1.default.like.findUnique({
            where: {
                userId_songId: {
                    userId: req.user.id,
                    songId,
                },
            },
        });
        if (!like) {
            return res.status(404).json({
                message: "Like not found",
            });
        }
        await prisma_1.default.like.delete({
            where: {
                userId_songId: {
                    userId: req.user.id,
                    songId,
                },
            },
        });
        res.status(200).json({
            message: "Song unliked successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.unlikeSong = unlikeSong;
// Get Liked Songs
const getLikedSongs = async (req, res) => {
    try {
        const likes = await prisma_1.default.like.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                song: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(likes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getLikedSongs = getLikedSongs;
