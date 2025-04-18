import { DataSource } from "typeorm";
import { DATABASE_URL, DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    ...(DATABASE_URL 
        ? { 
            url: DATABASE_URL,
            ssl: process.env.NODE_ENV === "production" ? {
                rejectUnauthorized: false
            } : false 
          }
        : {
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASS,
            database: DB_NAME
          }
    ),
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