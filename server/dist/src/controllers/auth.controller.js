"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;
    // Validate input
    if (!username || !email || !password || !confirmPassword || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        // Check if user already exists
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // validate role
        const allowedRoles = ["LISTENER", "ARTIST",];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        // Create the user
        const user = await prisma_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: role,
            }
        });
        // Generate a token
        const token = jsonwebtoken_1.default.sign({ id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await prisma_1.default.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check the password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate a token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user?.id },
            select: { id: true, username: true, email: true, role: true }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile retrieved successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getProfile = getProfile;
