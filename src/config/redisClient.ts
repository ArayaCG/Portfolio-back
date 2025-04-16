import Redis from "ioredis";

let redisClient: Redis;

try {
    redisClient = new Redis((process.env.REDIS_URL || "redis://redis:6379") + "?family=0", {
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
} catch (err) {
    console.error("Error al inicializar Redis:", err);

    const inMemoryStorage: Record<string, string> = {};
    const inMemoryLists: Record<string, string[]> = {};

    redisClient = {
        get: async (key: string) => inMemoryStorage[key] || null,
        setex: async (key: string, seconds: number, value: string) => {
            inMemoryStorage[key] = value;
            return "OK";
        },
        incr: async (key: string) => {
            const currentValue = parseInt(inMemoryStorage[key] || "0");
            const newValue = currentValue + 1;
            inMemoryStorage[key] = newValue.toString();
            return newValue;
        },
        expire: async () => 1,
        del: async () => 1,
        lpush: async (key: string, ...values: string[]) => {
            if (!inMemoryLists[key]) {
                inMemoryLists[key] = [];
            }
            inMemoryLists[key].unshift(...values);
            return inMemoryLists[key].length;
        },
        lrange: async (key: string, start: number, stop: number) => {
            if (!inMemoryLists[key]) {
                return [];
            }
            const end = stop < 0 ? inMemoryLists[key].length : stop + 1;
            return inMemoryLists[key].slice(start, end);
        },
    } as unknown as Redis;
}

export default redisClient;
