import { Router } from "express";
import {
    createExperience,
    deleteExperience,
    getExperiences,
    getExperienceById,
    updateExperience,
} from "../controllers/experience.controller";
import upload from "../config/multer.config";
import { verifyToken } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Experiences
 *   description: Gestión de experiencias
 */
const experienceRoute: Router = Router();

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
experienceRoute.get("/", getExperiences);

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
experienceRoute.get("/:id", getExperienceById);

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
experienceRoute.post("/", verifyToken, upload.array("images", 3), createExperience);

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
experienceRoute.put("/:id", verifyToken, upload.array("images", 3), updateExperience);

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
experienceRoute.delete("/:id", verifyToken, deleteExperience);

export default experienceRoute;
