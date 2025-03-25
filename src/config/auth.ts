import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./envs";

const SECRET_KEY = JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

export const generateAdminToken = () => {
    return jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        if ((decoded as any).role !== "admin") {
            return res.status(403).json({ message: "Acceso denegado" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
