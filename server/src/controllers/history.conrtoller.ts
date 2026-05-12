import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// Add to history 
export const addToHistory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { songId } = req.body as {
            songId: string;
        };

        // check if song exists

        const song = await prisma.song.findUnique({
            where: { id: songId },
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found",
            });
        }

        // Remove old duplicate 
        await prisma.recentlyPlayed.deleteMany({
            where: {
                userId: req.user!.id,
                songId,
            },
        });

        // add latest play 

        await prisma.recentlyPlayed.create({
            data: {
                userId: req.user!.id,
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


// get recently played 

 export const getRecentlyPlayed = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const recentlyPlayed = await prisma.recentlyPlayed.findMany({   
            where: {
                userId: req.user!.id,
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
