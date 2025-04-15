import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import upload from "../config/multer.config";
import { createSkill, deleteSkill, getSkillById, getSkills, updateSkill } from "../controllers/skill.controller";

const skillRoute: Router = Router();

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
skillRoute.get("/", getSkills);

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
skillRoute.get("/:id", getSkillById);

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
skillRoute.post("/", verifyToken, upload.single("image"), createSkill);

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
skillRoute.put("/:id", verifyToken, upload.single("image"), updateSkill);

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
skillRoute.delete("/:id", verifyToken, deleteSkill);

export default skillRoute;
