"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSongs = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const searchSongs = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }
        const songs = await prisma_1.default.song.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.searchSongs = searchSongs;
