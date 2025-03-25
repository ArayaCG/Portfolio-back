import "dotenv/config";

export const PORT = process.env.PORT;
export const BASE_DATOS = process.env.BASE_DATOS;
export const PASSWORD_POSTGRE = process.env.PASSWORD_POSTGRE;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const HOST_REDIS = process.env.HOST_REDIS;
export const PORT_REDIS = process.env.PORT_REDIS ? parseInt(process.env.PORT_REDIS, 10) : 6379;
export const JWT_SECRET = process.env.JWT_SECRET;
export const USERNAME_ADMIN = process.env.USERNAME_ADMIN;
export const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
