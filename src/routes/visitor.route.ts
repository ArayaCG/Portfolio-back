import { Router } from "express";
import { getVisitCounter, logVisit, getVisitLogs } from "../controllers/visitor.controller";
import { verifyToken } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Visits
 *   description: Gestión de visitas al portfolio
 */
const visitorRoute = Router();

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
visitorRoute.get("/count", getVisitCounter);

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
visitorRoute.post("/log", logVisit);

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
visitorRoute.get("/logs", verifyToken, getVisitLogs);

export default visitorRoute;
