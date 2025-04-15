"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */
const authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Nombre de usuario o correo electrónico
 *                 example: "usuario123"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (mínimo 8 caracteres)"
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Token generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales incorrectas
 */
authRouter.post("/login", (req, res) => authController.login(req, res));
exports.default = authRouter;
