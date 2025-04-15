"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactMessage_controller_1 = require("../controllers/contactMessage.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: ContactMessages
 *   description: Administración de mensajes de contacto
 */
const contactMessageRoute = (0, express_1.Router)();
/**
 * @swagger
 * /contactMessage:
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
contactMessageRoute.get("/", auth_middleware_1.verifyToken, contactMessage_controller_1.getMessages);
/**
 * @swagger
 * /contactMessage:
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
contactMessageRoute.post("/", contactMessage_controller_1.createMessage);
exports.default = contactMessageRoute;
