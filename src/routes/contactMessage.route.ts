import { Router } from "express";
import { createMessage, getMessages } from "../controllers/contactMessage.controller";
import { verifyToken } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: ContactMessages
 *   description: Administración de mensajes de contacto
 */
const contactMessageRoute: Router = Router();

/**
 * @swagger
 * /api/contactMessage:
 *   get:
 *     summary: Obtener todos los mensajes de contacto (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [ContactMessages]
 *     responses:
 *       200:
 *         description: Lista de mensajes obtenida correctamente
 *       401:
 *         description: No autorizado (Falta JWT)
 */
contactMessageRoute.get("/", verifyToken, getMessages);

/**
 * @swagger
 * /api/contactMessage:
 *   post:
 *     summary: Enviar un mensaje de contacto
 *     tags: [ContactMessages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje enviado correctamente
 *       500:
 *         description: Error en el servidor
 */
contactMessageRoute.post("/", createMessage);

export default contactMessageRoute;
