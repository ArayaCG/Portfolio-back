"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutMeService = exports.AboutMeService = void 0;
const redisClient_1 = __importDefault(require("../config/redisClient"));
const cloudinary_service_1 = require("../helpers/cloudinary.service");
const aboutMe_repository_1 = __importDefault(require("../repositories/aboutMe.repository"));
class AboutMeService {
    constructor() {
        this.ABOUT_ME_CACHE_KEY = "portfolio:about-me:single";
        this.ABOUT_ME_CACHE_EXPIRATION = 3600;
    }
    async getAboutMe() {
        try {
            const cachedAboutMe = await redisClient_1.default.get(this.ABOUT_ME_CACHE_KEY);
            if (cachedAboutMe) {
                return JSON.parse(cachedAboutMe);
            }
            const aboutMeResults = await aboutMe_repository_1.default.find();
            if (aboutMeResults.length === 0) {
                return null;
            }
            const aboutMe = aboutMeResults[0];
            await redisClient_1.default.setex(this.ABOUT_ME_CACHE_KEY, this.ABOUT_ME_CACHE_EXPIRATION, JSON.stringify(aboutMe));
            return aboutMe;
        }
        catch (error) {
            console.error("Error obteniendo About Me con caché:", error);
            const aboutMeResults = await aboutMe_repository_1.default.find();
            return aboutMeResults.length > 0 ? aboutMeResults[0] : null;
        }
    }
    async invalidateAboutMeCache() {
        try {
            await redisClient_1.default.del(this.ABOUT_ME_CACHE_KEY);
        }
        catch (error) {
            console.error("Error invalidando caché de About Me:", error);
        }
    }
    async createAboutMe(aboutMeData, file) {
        try {
            const imageUrl = await cloudinary_service_1.CloudinaryService.uploadImage(file.path);
            const newAboutMe = aboutMe_repository_1.default.create({
                ...aboutMeData,
                image: imageUrl,
            });
            await aboutMe_repository_1.default.save(newAboutMe);
            await this.invalidateAboutMeCache();
            return { message: "About Me creado con éxito" };
        }
        catch (error) {
            console.error("Error creando about me:", error);
            throw new Error(error instanceof Error ? error.message : "No se pudo crear el about me");
        }
    }
    async updateAboutMe(aboutMeData, file) {
        try {
            const existingAboutMe = await this.getAboutMe();
            if (!existingAboutMe)
                throw new Error("About Me no encontrado");
            if (file) {
                const imageUrl = await cloudinary_service_1.CloudinaryService.uploadImage(file.path);
                if (existingAboutMe.image) {
                    await cloudinary_service_1.CloudinaryService.deleteImage(existingAboutMe.image);
                }
                aboutMeData.image = imageUrl;
            }
            await aboutMe_repository_1.default.update(existingAboutMe.id, aboutMeData);
            await this.invalidateAboutMeCache();
            return { message: "About me actualizado con éxito" };
        }
        catch (error) {
            console.error(`Error actualizando about me`, error);
            throw new Error("No se pudo actualizar el about me.");
        }
    }
    async deleteAboutMe() {
        try {
            const aboutMe = await this.getAboutMe();
            if (!aboutMe)
                throw new Error("About me no encontrado");
            if (aboutMe.image) {
                await cloudinary_service_1.CloudinaryService.deleteImage(aboutMe.image);
            }
            await aboutMe_repository_1.default.remove(aboutMe);
            await this.invalidateAboutMeCache();
            return { message: "About me eliminado con éxito" };
        }
        catch (error) {
            console.error(`Error eliminando about me`, error);
            throw new Error("No se pudo eliminar about me.");
        }
    }
}
exports.AboutMeService = AboutMeService;
exports.aboutMeService = new AboutMeService();
