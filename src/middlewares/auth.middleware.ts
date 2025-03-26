import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    const token = authHeader.split(" ")[1];

    if (!JWT_SECRET) {
        return res.status(400).json({ message: "Error JWT" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido." });
    }
};
