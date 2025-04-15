"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminToken = exports.generateAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("./envs");
const SECRET_KEY = envs_1.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}
const generateAdminToken = () => {
    return jsonwebtoken_1.default.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
};
exports.generateAdminToken = generateAdminToken;
const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
exports.verifyAdminToken = verifyAdminToken;
