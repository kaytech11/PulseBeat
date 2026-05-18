"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const home_controller_1 = require("../controllers/home.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get personalized home feed
 *     tags:
 *       - Home
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home feed retrieved successfully
 */
router.get("/", auth_middleware_1.default, home_controller_1.getHomeFeed);
exports.default = router;
