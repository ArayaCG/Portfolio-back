"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const skill_controller_1 = require("../controllers/skill.controller");
const skillRoute = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID de la habilidad
 *         name:
 *           type: string
 *           description: Nombre de la habilidad
 *         image:
 *           type: string
 *           description: URL de la imagen de la habilidad
 *         description:
 *           type: string
 *           description: Descripción de la habilidad
 */
/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Obtener todas las habilidades
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Lista de habilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *       404:
 *         description: No se encontraron habilidades
 *       500:
 *         description: Error del servidor
 */
skillRoute.get("/", skill_controller_1.getSkills);
/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Obtener una habilidad por ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la habilidad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Habilidad no encontrada
 *       500:
 *         description: Error del servidor
 */
skillRoute.get("/:id", skill_controller_1.getSkillById);
/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Crear una nueva habilidad
 *     tags: [Skills]
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
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Habilidad creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error en el servidor
 */
skillRoute.post("/", auth_middleware_1.verifyToken, multer_config_1.default.single("image"), skill_controller_1.createSkill);
/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Actualizar una habilidad existente
 *     tags: [Skills]
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
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Habilidad actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Habilidad no encontrada
 *       500:
 *         description: Error en el servidor
 */
skillRoute.put("/:id", auth_middleware_1.verifyToken, multer_config_1.default.single("image"), skill_controller_1.updateSkill);
/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Eliminar una habilidad
 *     tags: [Skills]
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
 *         description: Habilidad eliminada exitosamente
 *       404:
 *         description: Habilidad no encontrada
 *       500:
 *         description: Error en el servidor
 */
skillRoute.delete("/:id", auth_middleware_1.verifyToken, skill_controller_1.deleteSkill);
exports.default = skillRoute;
