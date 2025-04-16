import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.middleware";
import {
    createEducation,
    deleteEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
} from "../controllers/education.controller";

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: Education
 *   description: Gestión de educación
 */
const educationRoute: Router = Router();

/**
 * @swagger
 * /api/educations:
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
educationRoute.get("/", getAllEducations);

/**
 * @swagger
 * /api/educations/{id}:
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
educationRoute.get("/:id", getEducationById);

/**
 * @swagger
 * /api/educations:
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
 *                 description: Nombre de la educación
 *               description:
 *                 type: string
 *                 description: Descripción de la educación
 *               year:
 *                 type: string
 *                 description: Año en el que se realizó o se completa la educación
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen relacionado con la educación
 *     responses:
 *       201:
 *         description: Educación creada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autorizado (Falta JWT)
 *       500:
 *         description: Error en el servidor
 */
educationRoute.post("/", verifyToken, upload.single("image"), createEducation);

/**
 * @swagger
 * /api/educations/{id}:
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
 *                 description: Nombre de la educación
 *               description:
 *                 type: string
 *                 description: Descripción de la educación
 *               year:
 *                 type: string
 *                 description: Año en el que se realizó o se completa la educación
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen relacionado con la educación
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
educationRoute.put("/:id", verifyToken, upload.single("image"), updateEducation);

/**
 * @swagger
 * /api/educations/{id}:
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
educationRoute.delete("/:id", verifyToken, deleteEducation);

export default educationRoute;
