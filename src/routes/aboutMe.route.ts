import { Router } from "express";
import multer from "multer";
import { getAboutMe, createAboutMe, updateAboutMe, deleteAboutMe } from "../controllers/aboutMe.controller";

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
 * /aboutMe:
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
 * /aboutMe:
 *   post:
 *     summary: Crear información personal
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
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.post("/", upload.single("image"), createAboutMe);

/**
 * @swagger
 * /aboutMe:
 *   put:
 *     summary: Actualizar información personal
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
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.put("/", upload.single("image"), updateAboutMe);

/**
 * @swagger
 * /aboutMe:
 *   delete:
 *     summary: Eliminar información personal
 *     tags: [AboutMe]
 *     responses:
 *       200:
 *         description: Información personal eliminada exitosamente
 *       500:
 *         description: Error en el servidor
 */
aboutMeRoute.delete("/", deleteAboutMe);

export default aboutMeRoute;
