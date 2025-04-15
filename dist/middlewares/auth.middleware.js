"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Acceso denegado. No hay token." });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!envs_1.JWT_SECRET) {
        res.status(400).json({ message: "Error JWT" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envs_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};
exports.verifyToken = verifyToken;
