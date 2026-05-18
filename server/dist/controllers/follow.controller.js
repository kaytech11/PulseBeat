"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowedArtists = exports.unfollowArtist = exports.followArtist = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Follow Artist
const followArtist = async (req, res) => {
    try {
        const { artistId } = req.params;
        // Prevent self-follow
        if (artistId === req.user.id) {
            return res.status(400).json({
                message: "You cannot follow yourself",
            });
        }
        // Check artist exists
        const artist = await prisma_1.default.user.findUnique({
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
        const existingFollow = await prisma_1.default.follow.findUnique({
            where: {
                followerId_artistId: {
                    followerId: req.user.id,
                    artistId,
                },
            },
        });
        if (existingFollow) {
            return res.status(400).json({
                message: "Already following artist",
            });
        }
        await prisma_1.default.follow.create({
            data: {
                followerId: req.user.id,
                artistId,
            },
        });
        res.status(201).json({
            message: "Artist followed successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.followArtist = followArtist;
// Unfollow Artist
const unfollowArtist = async (req, res) => {
    try {
        const { artistId } = req.params;
        const follow = await prisma_1.default.follow.findUnique({
            where: {
                followerId_artistId: {
                    followerId: req.user.id,
                    artistId,
                },
            },
        });
        if (!follow) {
            return res.status(404).json({
                message: "Follow relationship not found",
            });
        }
        await prisma_1.default.follow.delete({
            where: {
                followerId_artistId: {
                    followerId: req.user.id,
                    artistId,
                },
            },
        });
        res.status(200).json({
            message: "Artist unfollowed successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.unfollowArtist = unfollowArtist;
// Get Followed Artists
const getFollowedArtists = async (req, res) => {
    try {
        const follows = await prisma_1.default.follow.findMany({
            where: {
                followerId: req.user.id,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getFollowedArtists = getFollowedArtists;
