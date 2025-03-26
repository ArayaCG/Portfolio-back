import { Router } from "express";
import { createProject, deleteProject, getProjects } from "../controllers/project.controller";
import upload from "../config/multer.config";
import { verifyToken } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Gestión de proyectos
 */
const projectRoute: Router = Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Lista de proyectos obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
projectRoute.get("/", getProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crear un nuevo proyecto (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
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
 *               url:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 *       401:
 *         description: No autorizado
 */
projectRoute.post("/", verifyToken, upload.single("image"), createProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Eliminar un proyecto (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 *       401:
 *         description: No autorizado
 */
projectRoute.delete("/:id", verifyToken, deleteProject);

export default projectRoute;
