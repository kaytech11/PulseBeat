"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeFeed = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Personalized Home Feed
const getHomeFeed = async (req, res) => {
    try {
        // Trending Songs
        const trending = await prisma_1.default.song.findMany({
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
        const recentlyPlayed = await prisma_1.default.recentlyPlayed.findMany({
            where: {
                userId: req.user.id,
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
        const likedSongs = await prisma_1.default.like.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                song: true,
            },
            take: 10,
        });
        // Followed Artists
        const followedArtists = await prisma_1.default.follow.findMany({
            where: {
                followerId: req.user.id,
            },
            select: {
                artistId: true,
            },
        });
        const artistIds = followedArtists.map((follow) => follow.artistId);
        // Songs from followed artists
        const followingFeed = await prisma_1.default.song.findMany({
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
        const newReleases = await prisma_1.default.song.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getHomeFeed = getHomeFeed;
