import { Request, Response } from "express";
import { visitorService } from "../services/visitor.service";

export const logVisit = async (req: Request, res: Response) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const result = await visitorService.logVisit(ip);
        res.json(result);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
    }
};

export const getVisitLogs = async (req: Request, res: Response) => {
    try {
        const logs = await visitorService.getVisitLogs();
        res.json(logs);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
    }
};

export const getVisitCounter = async (req: Request, res: Response) => {
    try {
        const result = await visitorService.getVisitCounter();
        res.json(result);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
    }
};
