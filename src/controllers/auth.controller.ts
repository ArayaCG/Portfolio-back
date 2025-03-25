import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService = new AuthService();

    async login(req: Request, res: Response) {
        try {
            const { identifier, password } = req.body;

            const result = await this.authService.login(identifier, password);

            res.json(result);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Credenciales inválidas") {
                    return res.status(401).json({ message: error.message });
                }

                return res.status(500).json({ message: "Error en el servidor" });
            }

            res.status(500).json({ message: "Error desconocido" });
        }
    }

    async initializeAdmin(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const admin = await this.authService.createInitialAdmin(username, email, password);
            res.status(201).json({ message: "Admin creado", adminId: admin.id });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Error en el servidor" });
            }
        }
    }
}
