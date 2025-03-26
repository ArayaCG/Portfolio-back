import { DataSource } from "typeorm";
import { BASE_DATOS, PASSWORD_POSTGRE } from "./envs";
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
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: PASSWORD_POSTGRE,
    database: BASE_DATOS,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: loadEntities(),
    subscribers: [],
    migrations: [],
});
