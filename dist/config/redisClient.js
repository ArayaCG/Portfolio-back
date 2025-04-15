"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
let redisClient;
try {
    console.log("Intentando conectar a Redis con URL:", process.env.REDIS_URL);
    redisClient = new ioredis_1.default((process.env.REDIS_URL || "redis://redis:6379") + "?family=0", {
        retryStrategy: (times) => {
            console.log(`Intento de reconexión a Redis #${times}`);
            if (times > 5) {
                console.log("Demasiados intentos, deteniendo reconexiones");
                return null;
            }
            return Math.min(times * 50, 2000);
        },
        maxRetriesPerRequest: 3,
        connectTimeout: 10000,
    });
    redisClient.on("error", (err) => {
        console.error("Error de Redis:", err);
    });
    redisClient.on("connect", () => {
        console.log("Conectado a Redis exitosamente");
    });
}
catch (err) {
    console.error("Error al inicializar Redis:", err);
    const inMemoryStorage = {};
    const inMemoryLists = {};
    redisClient = {
        get: async (key) => inMemoryStorage[key] || null,
        setex: async (key, seconds, value) => {
            inMemoryStorage[key] = value;
            return "OK";
        },
        incr: async (key) => {
            const currentValue = parseInt(inMemoryStorage[key] || "0");
            const newValue = currentValue + 1;
            inMemoryStorage[key] = newValue.toString();
            return newValue;
        },
        expire: async () => 1,
        del: async () => 1,
        lpush: async (key, ...values) => {
            if (!inMemoryLists[key]) {
                inMemoryLists[key] = [];
            }
            inMemoryLists[key].unshift(...values);
            return inMemoryLists[key].length;
        },
        lrange: async (key, start, stop) => {
            if (!inMemoryLists[key]) {
                return [];
            }
            const end = stop < 0 ? inMemoryLists[key].length : stop + 1;
            return inMemoryLists[key].slice(start, end);
        },
    };
}
exports.default = redisClient;
