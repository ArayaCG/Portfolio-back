import { Router } from "express";
import multer from "multer";
import { getAboutMe, createAboutMe, updateAboutMe, deleteAboutMe } from "../controllers/aboutMe.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: AboutMe
 *   description: Gestión de información personal (About Me)
 */
const aboutMeRoute: Router = Router();

/**
 * @swagger
 * /api/aboutMe:
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
aboutMeRoute.get("/", getAboutMe);

/**
 * @swagger
 * /api/aboutMe:
 *   post:
 *     summary: Crear información personal
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado (Falta JWT)
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.post("/", verifyToken, upload.single("image"), createAboutMe);

/**
 * @swagger
 * /api/aboutMe:
 *   put:
 *     summary: Actualizar información personal
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado (Falta JWT)
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.put("/", verifyToken, upload.single("image"), updateAboutMe);

/**
 * @swagger
 * /api/aboutMe:
 *   delete:
 *     summary: Eliminar información personal
 *     security:
 *       - bearerAuth: []
 *     tags: [AboutMe]
 *     responses:
 *       200:
 *         description: Información personal eliminada exitosamente
 *       401:
 *         description: No autorizado (Falta JWT)
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.delete("/", verifyToken, deleteAboutMe);

export default aboutMeRoute;