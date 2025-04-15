import "dotenv/config";

export const PORT = process.env.PORT || "3000";
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const USERNAME_ADMIN = process.env.USERNAME_ADMIN;
export const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;

// En Railway, estas variables son proporcionadas automáticamente
export const DATABASE_URL = process.env.DATABASE_URL;
export const REDIS_URL = process.env.REDIS_URL || "";

// Mantén estas variables para desarrollo local
// En producción usaremos DATABASE_URL
export const DB_HOST = process.env.PGHOST;
export const DB_PORT = Number(process.env.PGPORT);
export const DB_USER = process.env.PGUSER;
export const DB_PASS = process.env.PGPASSWORD;
export const DB_NAME = process.env.PGDATABASE;