import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import { Type } from "../enum/type.enum";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Portfolio API",
            version: "1.0.0",
            description: "API privada para administración de portfolio",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                AboutMe: {
                    type: "object",
                    properties: {
                        id: { type: "number", readOnly: true },
                        name: { type: "string", maxLength: 100 },
                        rol: { type: "string", maxLength: 100 },
                        description: { type: "string" },
                        image: { type: "string", maxLength: 100 },
                        created_at: { type: "string", format: "date-time", readOnly: true },
                    },
                },
                Admin: {
                    type: "object",
                    properties: {
                        id: { type: "number", readOnly: true },
                        username: { type: "string", maxLength: 100 },
                        email: { type: "string", maxLength: 100, nullable: true },
                        password: { type: "string" },
                        token: { type: "string" },
                    },
                },
                ContactMessage: {
                    type: "object",
                    properties: {
                        id: { type: "number", readOnly: true },
                        name: { type: "string", maxLength: 100 },
                        email: { type: "string", maxLength: 100 },
                        message: { type: "string" },
                        created_at: { type: "string", format: "date-time", readOnly: true },
                    },
                },
                Education: {
                    type: "object",
                    properties: {
                        id: { type: "number", readOnly: true },
                        name: { type: "string", maxLength: 100 },
                        description: { type: "string" },
                        year: { type: "number" },
                    },
                },
                Experience: {
                    type: "object",
                    properties: {
                        id: { type: "number", readOnly: true },
                        name: { type: "string", maxLength: 100 },
                        description: { type: "string" },
                        technologies: { type: "string" },
                        date: { type: "string" },
                        url_deploy: { type: "string" },
                        image_url: { type: "string", maxLength: 100 },
                        logo_url: { type: "string", maxLength: 100 },
                        type: { type: Type },
                    },
                },
                Skills: {
                    type: "object",
                    properties: {
                        id: { type: "number", readOnly: true },
                        name: { type: "string", maxLength: 100 },
                        image: { type: "string", maxLength: 100 },
                        description: { type: "string" },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerRouter = Router();

swaggerRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
