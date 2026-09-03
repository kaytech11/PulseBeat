"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.googleLogin = exports.googleRegister = exports.login = exports.resendVerificationEmail = exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Register controller
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
        const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
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
                emailVerified: false,
                emailVerifiedToken: verificationToken,
                emailVerificationExpires: verificationExpires,
            }
        });
        await (0, email_1.sendVerificationEmail)(user.email, user.username, verificationToken);
        // Generate a token
        // const token = jwt.sign(
        //   {
        //     id: user.id,
        //     role: user.role
        //   },
        //   process.env.JWT_SECRET as string,
        //   { expiresIn: "1h" }
        // );
        // res.status(201).json({ message: "User registered successfully", token });
        return res.status(201).json({
            message: "User registered successfully.please check your email to verify your account.",
            // token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", });
    }
    // } catch (error) {
    //   console.error("Registration error:", error);
    //   return res.status(500).json({
    //     message: "Server error",
    //   });
    // }
};
exports.register = register;
// Verify email controller
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
        return res.status(400).json({
            message: "Verification token is required",
        });
    }
    try {
        // console.log('TOKEN RECEIVED:', token);
        const user = await prisma_1.default.user.findFirst({
            where: {
                emailVerifiedToken: token,
            },
        });
        // console.log(
        //   "USER FOUND:",
        //   user
        //     ? {
        //       id: user.id,
        //       email: user.email,
        //       emailVerified: user.emailVerified,
        //       emailVerifiedToken: user.emailVerifiedToken,
        //     }
        //     : null
        // );
        if (!user) {
            return res.status(400).json({
                message: "Invalid verification token",
            });
        }
        if (!user.emailVerificationExpires ||
            user.emailVerificationExpires < new Date()) {
            return res.status(400).json({
                message: "Verification token has expired",
            });
        }
        if (user.emailVerified) {
            return res.status(400).json({
                message: "Email is already verified",
            });
        }
        await prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerified: true,
                emailVerifiedToken: null,
                emailVerificationExpires: null,
            },
        });
        return res.status(200).json({
            message: "Email verified successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Email verification failed",
        });
    }
};
exports.verifyEmail = verifyEmail;
// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: "Email is required",
        });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        /*Don't reveal whether an email exists. prevents account enumeration.*/
        if (!user) {
            return res.status(200).json({
                message: "If an account exists with this email, a password reset link has been sent.",
            });
        }
        /*
         * Google-only accounts don't have a password
         * to reset.
         */
        if (!user.password) {
            return res.status(200).json({
                message: "If an account exists with this email, a password reset link has been sent.",
            });
        }
        const resetToken = crypto_1.default
            .randomBytes(32)
            .toString("hex");
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000);
        await prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                passwordResetToken: resetToken,
                passwordResetExpires: resetExpires,
            },
        });
        await (0, email_1.sendPasswordResetEmail)(user.email, user.username, resetToken);
        return res.status(200).json({
            message: "If an account exists with this email, a password reset link has been sent.",
        });
    }
    catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            message: "Unable to process password reset request",
        });
    }
};
exports.forgotPassword = forgotPassword;
// reset password
const resetPassword = async (req, res) => {
    const { token, password, confirmPassword, } = req.body;
    if (!token) {
        return res.status(400).json({
            message: "Reset token is required",
        });
    }
    if (!password || !confirmPassword) {
        return res.status(400).json({
            message: "Password and confirm password are required",
        });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
        });
    }
    try {
        const user = await prisma_1.default.user.findFirst({
            where: {
                passwordResetToken: token,
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired password reset token",
            });
        }
        if (!user.passwordResetExpires ||
            user.passwordResetExpires < new Date()) {
            return res.status(400).json({
                message: "Password reset token has expired",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });
        return res.status(200).json({
            message: "Password reset successfully. You can now login.",
        });
    }
    catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({
            message: "Unable to reset password",
        });
    }
};
exports.resetPassword = resetPassword;
// Resend email verification controller
const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: "Email is required",
        });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "If an account exists with this email, a verification email has been sent.",
            });
        }
        // Don't send another verification email
        // if the account is already verified
        if (user.emailVerified) {
            return res.status(400).json({
                message: "Email is already verified. You can login.",
            });
        }
        // Generate a NEW verification token
        const verificationToken = crypto_1.default
            .randomBytes(32)
            .toString("hex");
        // Token expires in 24 hours
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        // Save the new token and expiry
        await prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerifiedToken: verificationToken,
                emailVerificationExpires: verificationExpires,
            },
        });
        // Send the new verification email
        await (0, email_1.sendVerificationEmail)(user.email, user.username, verificationToken);
        return res.status(200).json({
            message: "Verification email sent successfully. Please check your email.",
        });
    }
    catch (error) {
        console.error("Resend verification email error:", error);
        return res.status(500).json({
            message: "Failed to resend verification email",
        });
    }
};
exports.resendVerificationEmail = resendVerificationEmail;
// login controller
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
        // check email verification
        // if (!user.emailVerified) {
        //   return res.status(403).json({
        //     message: "Please verify your email before you can login"
        //   });
        // }
        // Check the password
        // const isMatch = await bcrypt.compare(password, user.password);
        if (!user.password) {
            return res.status(400).json({
                message: "This account uses Google Sign-In. Please continue with Google.",
            });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // if (!user.emailVerified) {
        //   return res.status(403).json({
        //     message: "please verify your email before logging in."
        //   });
        // }
        // Generate a token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // res.json({ message: "Login successful", token });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.login = login;
// Google Register controller
const googleRegister = async (req, res) => {
    const { token, role } = req.body;
    if (!token || !role) {
        return res.status(400).json({
            message: "Google token and role are required",
        });
    }
    // Validate role
    const allowedRoles = ["LISTENER", "ARTIST"];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            message: "Invalid role",
        });
    }
    // Verify the Google token
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({
                message: "Invalid Google token",
            });
        }
        // Check if the user already exists
        const { sub, email, name, } = payload;
        const existingUser = await prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists. Please login with Google.",
            });
        }
        // Create a new user with the Google account information
        const user = await prisma_1.default.user.create({
            data: {
                username: name || "Google User",
                email: email,
                password: null,
                googleId: sub,
                role: role,
            },
        });
        // Generate a JWT token for the new user
        const jwtToken = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(201).json({
            message: "Google registration successful",
            token: jwtToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Google registration failed",
        });
    }
};
exports.googleRegister = googleRegister;
// Google Login controller
const googleLogin = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            message: "Google token is required",
        });
    }
    // Verify the Google token 
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({
                message: "Invalid Google token",
            });
        }
        // Check if the user exists in the database
        const { email, sub } = payload;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "No account found. Please register with Google first.",
            });
        }
        if (user.googleId !== sub) {
            return res.status(400).json({
                message: "This account was created with email and password. Please login normally.",
            });
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({
            message: "Google login successful",
            token: jwtToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Google login failed",
        });
    }
};
exports.googleLogin = googleLogin;
// Get Profile controller
const getProfile = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user?.id },
            select: { id: true, username: true, email: true, role: true, emailVerified: true, }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Profile retrieved successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getProfile = getProfile;
