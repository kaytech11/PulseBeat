"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import prisma from './config/prisma'; 
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const song_routes_1 = __importDefault(require("./routes/song.routes"));
const playlist_routes_1 = __importDefault(require("./routes/playlist.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const history_routes_1 = __importDefault(require("./routes/history.routes"));
const follow_routes_1 = __importDefault(require("./routes/follow.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const home_routes_1 = __importDefault(require("./routes/home.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Use auth routes
app.use('/api/auth', auth_routes_1.default);
// Use song routes
app.use('/api/songs', song_routes_1.default);
// Use playlist routes
app.use('/api/playlists', playlist_routes_1.default);
// Use like routes
app.use('/api/likes', like_routes_1.default);
// Use search routes
app.use('/api/search', search_routes_1.default);
// Use history routes
app.use('/api/history', history_routes_1.default);
// Use follow routes
app.use('/api/follows', follow_routes_1.default);
// Use dashboard routes
app.use('/api/dashboard', dashboard_routes_1.default);
// Use home routes
app.use('/api/home', home_routes_1.default);
// app.get ("/users", async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
// });
// Swagger UI setup
app.get('/', (_req, res) => {
    res.send("PulseBeat API running...");
});
// Serve Swagger UI at /api-docs
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = app;
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
