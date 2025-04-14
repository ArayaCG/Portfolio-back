import "dotenv/config";

export const PORT = process.env.PORT;
export const BASE_DATOS = process.env.BASE_DATOS;
export const PASSWORD_POSTGRE = process.env.PASSWORD_POSTGRE;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const USERNAME_ADMIN = process.env.USERNAME_ADMIN;
export const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
export const DB_HOST = process.env.PGHOST;
export const DB_PORT = Number(process.env.PGPORT);
export const DB_USER = process.env.PGUSER;
export const DB_PASS = process.env.PGPASSWORD;
export const DB_NAME = process.env.PGDATABASE;
export const REDIS_URL = process.env.REDIS_URL!;
