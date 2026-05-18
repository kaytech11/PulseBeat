"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistDashboard = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Artist Dashboard
const getArtistDashboard = async (req, res) => {
    try {
        // Ensure user is artist
        if (req.user?.role !== "ARTIST") {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        // Get artist songs
        const songs = await prisma_1.default.song.findMany({
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
        const totalPlays = songs.reduce((acc, song) => acc + song.playCount, 0);
        // Total likes
        const totalLikes = songs.reduce((acc, song) => acc + song.likes.length, 0);
        // Followers count
        const followersCount = await prisma_1.default.follow.count({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getArtistDashboard = getArtistDashboard;
