import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Define the structure of the JWT payload
interface Jwtpayload {
    id: string;
    role: string;
}

// Define a custom request interface that includes the user property
export interface AuthRequest extends Request {
    user?: Jwtpayload;
}

// authenticate requests using JWT

const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        // check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "no token provided" });
        }

        // extract token
        const token = authHeader.split(" ")[1];

        // verify token
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string
        ) as Jwtpayload;

        // attach user info to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "invalid token", error });
    }
};

export default authMiddleware;