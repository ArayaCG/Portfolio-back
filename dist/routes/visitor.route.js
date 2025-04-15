"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitor_controller_1 = require("../controllers/visitor.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: Gestión de visitas al portfolio
 */
const visitorRoute = (0, express_1.Router)();
/**
 * @swagger
 * /api/visits/count:
 *   get:
 *     summary: Obtener el contador de visitas
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: Total de visitas obtenidas
 */
visitorRoute.get("/count", visitor_controller_1.getVisitCounter);
/**
 * @swagger
 * /api/visits/log:
 *   post:
 *     summary: Registrar una visita con ubicación
 *     tags: [Visits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visita registrada correctamente
 */
visitorRoute.post("/log", visitor_controller_1.logVisit);
/**
 * @swagger
 * /api/visits/logs:
 *   get:
 *     summary: Obtener logs de visitas (Requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     tags: [Visits]
 *     responses:
 *       200:
 *         description: Lista de logs obtenida correctamente
 *       401:
 *         description: No autorizado
 */
visitorRoute.get("/logs", auth_middleware_1.verifyToken, visitor_controller_1.getVisitLogs);
exports.default = visitorRoute;
