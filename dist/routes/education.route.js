"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const education_controller_1 = require("../controllers/education.controller");
const upload = (0, multer_1.default)({ dest: "uploads/" });
/**
 * @swagger
 * tags:
 *   name: Education
 *   description: Gestión de educación
 */
const educationRoute = (0, express_1.Router)();
/**
 * @swagger
 * /educations:
 *   get:
 *     summary: Obtener todas las educaciones
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: Lista de educaciones obtenida exitosamente
 *       404:
 *         description: No se encontraron educaciones
 *       500:
 *         description: Error en el servidor
 */
educationRoute.get("/", education_controller_1.getAllEducations);
/**
 * @swagger
 * /educations/{id}:
 *   get:
 *     summary: Obtener una educación por ID
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Educación obtenida exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Educación no encontrada
 *       500:
 *         description: Error en el servidor
 */
educationRoute.get("/:id", education_controller_1.getEducationById);
/**
 * @swagger
 * /educations:
 *   post:
 *     summary: Crear una nueva educación
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               year:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Educación creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error en el servidor
 */
educationRoute.post("/", auth_middleware_1.verifyToken, upload.single("image"), education_controller_1.createEducation);
/**
 * @swagger
 * /educations/{id}:
 *   put:
 *     summary: Actualizar una educación existente
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               year:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Educación actualizada exitosamente
 *       400:
 *         description: ID inválido o datos incorrectos
 *       404:
 *         description: Educación no encontrada
 *       500:
 *         description: Error en el servidor
 */
educationRoute.put("/:id", auth_middleware_1.verifyToken, upload.single("image"), education_controller_1.updateEducation);
/**
 * @swagger
 * /educations/{id}:
 *   delete:
 *     summary: Eliminar una educación
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Educación eliminada exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Educación no encontrada
 *       500:
 *         description: Error en el servidor
 */
educationRoute.delete("/:id", auth_middleware_1.verifyToken, education_controller_1.deleteEducation);
exports.default = educationRoute;
