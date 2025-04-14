import Redis from "ioredis";
import { REDIS_URL } from "./envs";

const redis = new Redis(REDIS_URL!);

redis.on("connect", () => console.log("🔌 Conectado a Redis"));
redis.on("error", (err) => console.error("❌ Error en Redis:", err));

export default redis;
