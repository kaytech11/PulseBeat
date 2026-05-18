"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentlyPlayed = exports.addToHistory = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Add to history 
const addToHistory = async (req, res) => {
    try {
        const { songId } = req.body;
        // check if song exists
        const song = await prisma_1.default.song.findUnique({
            where: { id: songId },
        });
        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }
        // Remove old duplicate 
        await prisma_1.default.recentlyPlayed.deleteMany({
            where: {
                userId: req.user.id,
                songId,
            },
        });
        // add latest play 
        await prisma_1.default.recentlyPlayed.create({
            data: {
                userId: req.user.id,
                songId,
            },
        });
        res.status(200).json({
            message: "Added to history",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.addToHistory = addToHistory;
// get recently played 
const getRecentlyPlayed = async (req, res) => {
    try {
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
            take: 20, // limit to last 20 played songs
        });
        res.status(200).json(history);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getRecentlyPlayed = getRecentlyPlayed;
