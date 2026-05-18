"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const history_conrtoller_1 = require("../controllers/history.conrtoller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /history/{songId}:
 *   post:
 *     summary: Add song to recently played
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *           example: song123
 *     responses:
 *       201:
 *         description: Song added to history
 */
router.post('/:songId', auth_middleware_1.default, history_conrtoller_1.addToHistory);
/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get recently played songs
 *     tags:
 *       - History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recently played songs retrieved
 */
router.get('/', auth_middleware_1.default, history_conrtoller_1.getRecentlyPlayed);
exports.default = router;
