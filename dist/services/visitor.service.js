"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorService = exports.VisitorService = void 0;
const redisClient_1 = __importDefault(require("../config/redisClient"));
const axios_1 = __importDefault(require("axios"));
const VISITOR_KEY = "portfolio:visits";
const VISITOR_LOGS_KEY = "portfolio:visit_logs";
class VisitorService {
    constructor(redisClient) {
        this.redis = redisClient;
    }
    async logVisit(ip) {
        let location = "Unknown, Unknown";
        let visits = 0;
        try {
            const ipAddress = Array.isArray(ip) ? ip[0] : ip;
            try {
                const geoData = await axios_1.default.get(`http://ip-api.com/json/${ipAddress}?fields=country,city`);
                const { country, city } = geoData.data;
                if (country && city) {
                    location = `${city}, ${country}`;
                }
            }
            catch (geoError) {
                console.warn("Error obteniendo geolocalización", geoError);
            }
            const visitData = {
                location: location,
                timestamp: new Date().toISOString(),
            };
            visits = await this.redis.incr(VISITOR_KEY);
            await this.redis.lpush(VISITOR_LOGS_KEY, JSON.stringify(visitData));
            return {
                message: "✅ Visita registrada en logs",
                visits,
            };
        }
        catch (error) {
            console.error("Error al registrar visita", error);
            throw new Error("Error al registrar visita");
        }
    }
    async getVisitLogs() {
        try {
            const logs = await this.redis.lrange(VISITOR_LOGS_KEY, 0, -1);
            return logs.map((log) => JSON.parse(log));
        }
        catch (error) {
            console.error("Error obteniendo logs", error);
            throw new Error("Error al obtener logs");
        }
    }
    async getVisitCounter() {
        try {
            const counter = await this.redis.get(VISITOR_KEY);
            return { visits: counter ? parseInt(counter) : 0 };
        }
        catch (error) {
            console.error("Error obteniendo contador", error);
            throw new Error("Error al obtener contador");
        }
    }
}
exports.VisitorService = VisitorService;
exports.visitorService = new VisitorService(redisClient_1.default);
