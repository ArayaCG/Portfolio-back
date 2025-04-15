"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experience_controller_1 = require("../controllers/experience.controller");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: Experiences
 *   description: Gestión de experiencias
 */
const experienceRoute = (0, express_1.Router)();
/**
 * @swagger
 * /experiences:
 *   get:
 *     summary: Obtener todas las experiencias
 *     tags: [Experiences]
 *     responses:
 *       200:
 *         description: Lista de experiencias obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 *       500:
 *         description: Error en el servidor
 */
experienceRoute.get("/", experience_controller_1.getExperiences);
/**
 * @swagger
 * /experiences/{id}:
 *   get:
 *     summary: Obtener una experiencia por su ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia
 *     responses:
 *       200:
 *         description: Experiencia obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
experienceRoute.get("/:id", experience_controller_1.getExperienceById);
/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Crear una nueva experiencia (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Experiences]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la experiencia
 *                 maxLength: 36
 *               description:
 *                 type: string
 *                 description: Descripción de la experiencia
 *               technologies:
 *                 type: string
 *                 description: Tecnologías utilizadas
 *               date:
 *                 type: string
 *                 description: Fecha de la experiencia
 *               url_deploy:
 *                 type: string
 *                 description: URL del despliegue
 *               type:
 *                 type: string
 *                 enum: [project, work, education]
 *                 description: Tipo de experiencia
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Imágenes de la experiencia (logo e imagen principal)
 *     responses:
 *       201:
 *         description: Experiencia creada correctamente
 *       400:
 *         description: Error en la solicitud (ej. sin imágenes)
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
experienceRoute.post("/", auth_middleware_1.verifyToken, multer_config_1.default.array("images", 3), experience_controller_1.createExperience);
/**
 * @swagger
 * /experiences/{id}:
 *   put:
 *     summary: Actualizar una experiencia existente (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la experiencia
 *               description:
 *                 type: string
 *                 description: Descripción de la experiencia
 *               url_deploy:
 *                 type: string
 *                 description: URL del despliegue
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nueva(s) imagen(es) de la experiencia (opcional)
 *     responses:
 *       200:
 *         description: Experiencia actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
experienceRoute.put("/:id", auth_middleware_1.verifyToken, multer_config_1.default.array("images", 3), experience_controller_1.updateExperience);
/**
 * @swagger
 * /experiences/{id}:
 *   delete:
 *     summary: Eliminar una experiencia (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia a eliminar
 *     responses:
 *       200:
 *         description: Experiencia eliminada correctamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
experienceRoute.delete("/:id", auth_middleware_1.verifyToken, experience_controller_1.deleteExperience);
exports.default = experienceRoute;
