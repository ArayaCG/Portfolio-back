import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void;
