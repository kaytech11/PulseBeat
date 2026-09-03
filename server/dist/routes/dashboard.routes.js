"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /dashboard/artist:
 *   get:
 *     summary: Get artist dashboard analytics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Artist dashboard retrieved
 */
// router.get(
//   "/artist",
//   authMiddleware,
//   roleMiddleware("artist"),
//   getArtistDashboard
// );
router.get("/artist", auth_middleware_1.default, (0, role_middleware_1.default)("ARTIST"), dashboard_controller_1.getArtistDashboard);
exports.default = router;
