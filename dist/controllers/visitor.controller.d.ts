import { Request, Response } from "express";
export declare const logVisit: (req: Request, res: Response) => Promise<void>;
export declare const getVisitLogs: (req: Request, res: Response) => Promise<void>;
export declare const getVisitCounter: (req: Request, res: Response) => Promise<void>;
