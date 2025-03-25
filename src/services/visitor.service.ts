import redis from "../config/redisClient";
import axios from "axios";

const VISITOR_KEY = "portfolio:visits";
const VISITOR_LOGS_KEY = "portfolio:visit_logs";

export class VisitorService {
    private redis: typeof redis;

    constructor(redisClient: typeof redis) {
        this.redis = redisClient;
    }

    async logVisit(ip: string | string[] | undefined): Promise<{ message: string; visits: number }> {
        let location = "Unknown, Unknown";
        let visits = 0;

        try {
            const ipAddress = Array.isArray(ip) ? ip[0] : ip;

            try {
                const geoData = await axios.get(`http://ip-api.com/json/${ipAddress}?fields=country,city`);
                const { country, city } = geoData.data;

                if (country && city) {
                    location = `${city}, ${country}`;
                }
            } catch (geoError) {
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
        } catch (error) {
            console.error("Error al registrar visita", error);
            throw new Error("Error al registrar visita");
        }
    }

    async getVisitLogs(): Promise<any[]> {
        try {
            const logs = await this.redis.lrange(VISITOR_LOGS_KEY, 0, -1);
            return logs.map((log) => JSON.parse(log));
        } catch (error) {
            console.error("Error obteniendo logs", error);
            throw new Error("Error al obtener logs");
        }
    }

    async getVisitCounter(): Promise<{ visits: number }> {
        try {
            const counter = await this.redis.get(VISITOR_KEY);
            return { visits: counter ? parseInt(counter) : 0 };
        } catch (error) {
            console.error("Error obteniendo contador", error);
            throw new Error("Error al obtener contador");
        }
    }
}

export const visitorService = new VisitorService(redis);
