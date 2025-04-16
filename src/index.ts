import "reflect-metadata";
import { PORT } from "./config/envs";
import server from "./server";
import { AppDataSource } from "./config/data-source";
import { initializeAdmin } from "./seeders/admin.seeder";
import { swaggerOptions } from "./config/swagger.config";
import router from "./routes";

AppDataSource.initialize()
    .then(async (res) => {
        console.log("Conexión realizada con éxito");
        console.log("Swagger APIs:", swaggerOptions.apis);
        
        try {
            console.log("Rutas:", router.stack ? router.stack.length : "No hay stack");
        } catch (e: any) {
            console.log("Error al acceder a router.stack:", e.message);
        }
        
        // Registra el endpoint de depuración ANTES de iniciar el servidor
        server.get("/debug-swagger", (req, res) => {
            res.json({
                swaggerApis: swaggerOptions.apis,
                routesCount: router.stack ? router.stack.length : 0,
                routes: router.stack ? router.stack.map((r) => r.route?.path).filter(Boolean) : [],
            });
        });
        
        await initializeAdmin();

        server.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al inicializar la base de datos:", error);
    });