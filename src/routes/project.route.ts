import { Router } from "express";
import {
    createProject,
    deleteProject,
    getProjects,
    getProjectById,
    updateProject,
} from "../controllers/project.controller";
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Error en el servidor
 */
projectRoute.get("/", getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtener un proyecto por su ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
projectRoute.get("/:id", getProjectById);

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
 *                 description: Nombre del proyecto
 *               description:
 *                 type: string
 *                 description: Descripción del proyecto
 *               url:
 *                 type: string
 *                 description: URL del proyecto
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del proyecto
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error en la solicitud (ej. sin imagen)
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
projectRoute.post("/", verifyToken, upload.single("image"), createProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualizar un proyecto existente (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del proyecto
 *               description:
 *                 type: string
 *                 description: Descripción del proyecto
 *               url:
 *                 type: string
 *                 description: URL del proyecto
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen del proyecto (opcional)
 *     responses:
 *       200:
 *         description: Proyecto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error en el servidor
 */
projectRoute.put("/:id", verifyToken, upload.single("image"), updateProject);

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
 *         description: ID del proyecto a eliminar
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
projectRoute.delete("/:id", verifyToken, deleteProject);

export default projectRoute;
