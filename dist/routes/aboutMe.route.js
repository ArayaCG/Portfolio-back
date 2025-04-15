"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const aboutMe_controller_1 = require("../controllers/aboutMe.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload = (0, multer_1.default)({ dest: "uploads/" });
/**
 * @swagger
 * tags:
 *   name: AboutMe
 *   description: Gestión de información personal (About Me)
 */
const aboutMeRoute = (0, express_1.Router)();
/**
 * @swagger
 * /aboutMe:
 *   get:
 *     summary: Obtener información personal
 *     tags: [AboutMe]
 *     responses:
 *       200:
 *         description: Información personal obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AboutMe'
 *       404:
 *         description: No se encontró información personal
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.get("/", aboutMe_controller_1.getAboutMe);
/**
 * @swagger
 * /aboutMe:
 *   post:
 *     summary: Crear información personal
 *     tags: [AboutMe]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rol:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Información personal creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.post("/", auth_middleware_1.verifyToken, upload.single("image"), aboutMe_controller_1.createAboutMe);
/**
 * @swagger
 * /aboutMe:
 *   put:
 *     summary: Actualizar información personal
 *     tags: [AboutMe]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Información personal actualizada exitosamente
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.put("/", auth_middleware_1.verifyToken, upload.single("image"), aboutMe_controller_1.updateAboutMe);
/**
 * @swagger
 * /aboutMe:
 *   delete:
 *     summary: Eliminar información personal
 *     tags: [AboutMe]
 *     responses:
 *       200:
 *         description: Información personal eliminada exitosamente
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.delete("/", auth_middleware_1.verifyToken, aboutMe_controller_1.deleteAboutMe);
exports.default = aboutMeRoute;
