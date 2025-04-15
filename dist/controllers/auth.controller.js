"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    async login(req, res) {
        try {
            const { identifier, password } = req.body;
            const result = await this.authService.login(identifier, password);
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "Credenciales inválidas") {
                    res.status(401).json({ message: error.message });
                    return;
                }
                res.status(500).json({ message: "Error en el servidor" });
                return;
            }
            res.status(500).json({ message: "Error desconocido" });
        }
    }
    async initializeAdmin(req, res) {
        try {
            const { username, email, password } = req.body;
            const admin = await this.authService.createInitialAdmin(username, email, password);
            res.status(201).json({ message: "Admin creado", adminId: admin.id });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
            else {
                res.status(500).json({ message: "Error en el servidor" });
                return;
            }
        }
    }
}
exports.AuthController = AuthController;
