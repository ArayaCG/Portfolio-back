"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const envs_1 = require("./envs");
const redis = new ioredis_1.default(envs_1.REDIS_URL);
redis.on("connect", () => console.log("🔌 Conectado a Redis"));
redis.on("error", (err) => console.error("❌ Error en Redis:", err));
exports.default = redis;
