"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisitCounter = exports.getVisitLogs = exports.logVisit = void 0;
const visitor_service_1 = require("../services/visitor.service");
const logVisit = async (req, res) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const result = await visitor_service_1.visitorService.logVisit(ip);
        res.json(result);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
    }
};
exports.logVisit = logVisit;
const getVisitLogs = async (req, res) => {
    try {
        const logs = await visitor_service_1.visitorService.getVisitLogs();
        res.json(logs);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
    }
};
exports.getVisitLogs = getVisitLogs;
const getVisitCounter = async (req, res) => {
    try {
        const result = await visitor_service_1.visitorService.getVisitCounter();
        res.json(result);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: errorMessage });
    }
};
exports.getVisitCounter = getVisitCounter;
