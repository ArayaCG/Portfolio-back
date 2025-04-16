import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import upload from "../config/multer.config";
import {
    createSkill,
    createSkills,
    deleteSkill,
    getSkillById,
    getSkills,
    updateSkill,
} from "../controllers/skill.controller";

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
 * /api/skills:
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
 * /api/skills/{id}:
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
 * /api/skills:
 *   post:
 *     summary: Crear una nueva habilidad
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 example: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
 *     responses:
 *       201:
 *         description: Habilidad creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error en el servidor
 */

skillRoute.post("/", verifyToken, createSkill);

/**
 * @swagger
 * /api/skills/batch:
 *   post:
 *     summary: Crear múltiples habilidades
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 imagen:
 *                   type: string
 *                 nombreIcono:
 *                   type: string
 *             example:
 *               - nombre: "React"
 *                 imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
 *                 nombreIcono: "FaReact"
 *               - nombre: "Vue"
 *                 imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
 *                 nombreIcono: "SiVuedotjs"
 *               # (Y aquí van los demás elementos de la lista)
 *     responses:
 *       201:
 *         description: Habilidades creadas exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error en el servidor
 */
skillRoute.post("/batch", verifyToken, createSkills);

/**
 * @swagger
 * /api/skills/{id}:
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 example: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
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
skillRoute.put("/:id", verifyToken, updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
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
