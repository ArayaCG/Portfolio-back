import Redis from "ioredis";
import { HOST_REDIS, PORT_REDIS } from "./envs";

const redis = new Redis({
    host: HOST_REDIS,
    port: PORT_REDIS,
});

redis.on("connect", () => console.log("🔌 Conectado a Redis"));
redis.on("error", (err) => console.error("❌ Error en Redis:", err));

export default redis;
