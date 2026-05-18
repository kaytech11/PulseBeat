"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
exports.default = roleMiddleware;
