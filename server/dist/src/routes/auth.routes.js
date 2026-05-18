"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: kayode
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: ARTIST
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', auth_controller_1.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: kayode@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', auth_controller_1.login);
/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 */
router.get('/profile', auth_middleware_1.default, auth_controller_1.getProfile);
exports.default = router;
