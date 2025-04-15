import { Request, Response, NextFunction } from "express";
export declare const generateAdminToken: () => string;
export declare const verifyAdminToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
