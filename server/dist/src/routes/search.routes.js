"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search.controller");
const router = (0, express_1.Router)();
// Search songs
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search songs and artists
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           example: burna
 *     responses:
 *       200:
 *         description: Search results retrieved
 */
router.get('/', search_controller_1.searchSongs);
exports.default = router;
