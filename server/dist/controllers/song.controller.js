"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingSongs = exports.streamSongs = exports.deleteSongs = exports.updateSongs = exports.getSongs = exports.uploadSongs = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const uploadToCloudinary_1 = __importDefault(require("../utils/uploadToCloudinary"));
const busboy_1 = __importDefault(require("busboy"));
// Upload Song
const uploadSongs = async (req, res) => {
    try {
        const busboy = (0, busboy_1.default)({
            headers: req.headers,
            limits: {
                files: 2,
            },
        });
        let title = "";
        let artist = "";
        let audioUrl = null;
        let coverImageUrl = null;
        let audioUpload = null;
        let coverUpload = null;
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
                audioUpload = (0, uploadToCloudinary_1.default)(file, "pulsebeat/audio", "video");
            }
            if (fieldname === "cover") {
                coverUpload = (0, uploadToCloudinary_1.default)(file, "pulsebeat/covers", "image");
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
                const song = await prisma_1.default.song.create({
                    data: {
                        title,
                        artist,
                        audioUrl,
                        coverImage: coverImageUrl,
                        userId: req.user.id,
                    },
                });
                return res.status(201).json({
                    message: "Song uploaded successfully",
                    song,
                });
            }
            catch (error) {
                console.error("Cloudinary upload error:", error);
                if (!res.headersSent) {
                    return res.status(500).json({
                        message: "Failed to upload song",
                    });
                }
            }
        });
        req.pipe(busboy);
    }
    catch (error) {
        console.error("Upload song error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};
exports.uploadSongs = uploadSongs;
// Get All Songs
const getSongs = async (_req, res) => {
    try {
        const songs = await prisma_1.default.song.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getSongs = getSongs;
// Update Song
const updateSongs = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await prisma_1.default.song.findUnique({
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
        const updatedSong = await prisma_1.default.song.update({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.updateSongs = updateSongs;
// Delete Song
const deleteSongs = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await prisma_1.default.song.findUnique({
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
        await prisma_1.default.song.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Song deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.deleteSongs = deleteSongs;
// Stream Song
const streamSongs = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await prisma_1.default.song.findUnique({
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
        const updatedSong = await prisma_1.default.song.update({
            where: { id },
            data: {
                playCount: {
                    increment: 1,
                },
            },
        });
        res.status(200).json({
            message: "Streaming song",
            song: {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.streamSongs = streamSongs;
// trending songs 
const getTrendingSongs = async (_req, res) => {
    try {
        const songs = await prisma_1.default.song.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getTrendingSongs = getTrendingSongs;
