import { Request, Response } from "express";
export declare class AuthController {
    private authService;
    login(req: Request, res: Response): Promise<void>;
    initializeAdmin(req: Request, res: Response): Promise<void>;
}
