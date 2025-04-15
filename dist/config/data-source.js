"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    ...(envs_1.DATABASE_URL
        ? {
            url: envs_1.DATABASE_URL,
            ssl: process.env.NODE_ENV === "production" ? {
                rejectUnauthorized: false
            } : false
        }
        : {
            host: envs_1.DB_HOST,
            port: envs_1.DB_PORT,
            username: envs_1.DB_USER,
            password: envs_1.DB_PASS,
            database: envs_1.DB_NAME
        }),
    synchronize: true,
    logging: false,
    dropSchema: false,
    entities: [
        process.env.NODE_ENV === "production"
            ? "dist/entities/**/*.js"
            : "src/entities/**/*.ts"
    ],
    subscribers: [],
    migrations: [],
});
