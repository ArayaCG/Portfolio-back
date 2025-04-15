"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_PASS = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.REDIS_URL = exports.DATABASE_URL = exports.PASSWORD_ADMIN = exports.USERNAME_ADMIN = exports.JWT_SECRET = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.EMAIL_PASS = exports.EMAIL_USER = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || "3000";
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASS = process.env.EMAIL_PASS;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.USERNAME_ADMIN = process.env.USERNAME_ADMIN;
exports.PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
// En Railway, estas variables son proporcionadas automáticamente
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.REDIS_URL = process.env.REDIS_URL || "";
// Mantén estas variables para desarrollo local
// En producción usaremos DATABASE_URL
exports.DB_HOST = process.env.PGHOST;
exports.DB_PORT = Number(process.env.PGPORT);
exports.DB_USER = process.env.PGUSER;
exports.DB_PASS = process.env.PGPASSWORD;
exports.DB_NAME = process.env.PGDATABASE;
