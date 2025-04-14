import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./envs";
import { readdirSync } from "fs";
import path from "path";

const loadEntities = () => {
    const entitiesDir = path.join(__dirname, "../entities");
    const entityFiles = readdirSync(entitiesDir).filter((file) => file.endsWith(".ts") && !file.endsWith(".d.ts"));

    return entityFiles.map((file) => {
        const module = require(path.join(entitiesDir, file));
        return module.default || module[Object.keys(module)[0]];
    });
};

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: loadEntities(),
    subscribers: [],
    migrations: [],
});
