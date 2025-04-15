import express from "express";
import router from "./routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

const server = express();

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(cors());
server.use(express.json());
server.use(router);
server.get("/health", (req, res) => {
    res.status(200).send("OK");
});

export default server;
