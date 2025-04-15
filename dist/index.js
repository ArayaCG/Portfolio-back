"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
const data_source_1 = require("./config/data-source");
const admin_seeder_1 = require("./seeders/admin.seeder");
data_source_1.AppDataSource.initialize()
    .then(async (res) => {
    console.log("Conexión realizada con éxito");
    await (0, admin_seeder_1.initializeAdmin)();
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Server listening on PORT ${envs_1.PORT}`);
    });
})
    .catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
});
