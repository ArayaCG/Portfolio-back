import "reflect-metadata";
import { PORT } from "./config/envs";
import server from "./server";
import { AppDataSource } from "./config/data-source";
import { initializeAdmin } from "./seeders/admin.seeder";

AppDataSource.initialize()
    .then(async (res) => {
        console.log("Conexión realizada con éxito");
        await initializeAdmin();
        server.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al inicializar la base de datos:", error);
    });