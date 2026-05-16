import express from 'express';
import cors from 'cors';
// import prisma from './config/prisma'; // temporary import to ensure prisma is initialized
import authRoutes from './routes/auth.routes';
import songRoutes from './routes/song.routes';
import playlistRoutes from './routes/playlist.routes';
import likeRoutes from './routes/like.routes';
import searchRoutes from './routes/search.routes';
import historyRoutes from './routes/history.routes';
import followRoutes from './routes/follow.routes';
import dashboardRoutes from './routes/dashboard.routes';  
import homeRoutes from './routes/home.routes';  

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);
    
// Use song routes
app.use('/api/songs', songRoutes);
// Use playlist routes
app.use('/api/playlists', playlistRoutes);
// Use like routes
app.use('/api/likes', likeRoutes);

// Use search routes
app.use('/api/search', searchRoutes);
// Use history routes
app.use('/api/history', historyRoutes);
// Use follow routes
app.use('/api/follow', followRoutes);
// Use dashboard routes
app.use('/api/dashboard', dashboardRoutes);
// Use home routes
app.use('/api/home', homeRoutes);

// app.get ("/users", async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
// });

// Swagger UI setup


app.get('/', (_req, res) => {
    res.send("PulseBeat API running...");
});

// Serve Swagger UI at /api-docs
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

export default app;

//POST /api/playlists
//GET /api/playlists
//POST /api/playlists/:playlistId/songs/:songId
//POST /api/likes/:songId
//DELETE /api/likes/:songId
// GET /api/likes
// GET /api/search?q=searchTerm
// POST /api/history/:songId
// GET /api/history
// POST /api/follow/:artistId
// DELETE /api/follow/:artistId
// GET /api/follow
// GET /api/dashboard/artist
// GET /api/home






