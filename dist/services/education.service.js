"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationService = void 0;
const redisClient_1 = __importDefault(require("../config/redisClient"));
const cloudinary_service_1 = __importDefault(require("../helpers/cloudinary.service"));
const education_repository_1 = __importDefault(require("../repositories/education.repository"));
class EducationService {
    constructor() {
        this.EDUCATION_LIST_CACHE_KEY = "portfolio:educations:list";
        this.EDUCATION_ITEM_CACHE_PREFIX = "portfolio:educations:item:";
        this.EDUCATION_CACHE_EXPIRATION = 3600;
    }
    async getEducations() {
        try {
            const cachedEducations = await redisClient_1.default.get(this.EDUCATION_LIST_CACHE_KEY);
            if (cachedEducations)
                return JSON.parse(cachedEducations);
            const educations = await education_repository_1.default.find();
            await redisClient_1.default.setex(this.EDUCATION_LIST_CACHE_KEY, this.EDUCATION_CACHE_EXPIRATION, JSON.stringify(educations));
            return educations;
        }
        catch (error) {
            console.error("Error obteniendo educación con caché", error);
            const educationsResults = await education_repository_1.default.find();
            return educationsResults.length > 0 ? educationsResults : null;
        }
    }
    async invalidateEducationsCache() {
        try {
            await redisClient_1.default.del(this.EDUCATION_LIST_CACHE_KEY);
        }
        catch (error) {
            console.error("Error invalidando caché de educación", error);
        }
    }
    async getEducationById(id) {
        try {
            const cacheKey = `${this.EDUCATION_ITEM_CACHE_PREFIX}${id}`;
            const cachedEducation = await redisClient_1.default.get(cacheKey);
            if (cachedEducation)
                return JSON.parse(cachedEducation);
            const education = await education_repository_1.default.findOne({ where: { id } });
            if (education) {
                await redisClient_1.default.setex(cacheKey, this.EDUCATION_CACHE_EXPIRATION, JSON.stringify(education));
            }
            return education;
        }
        catch (error) {
            console.error(`Error obteniendo educación ${id} con caché:`, error);
            const educationResult = await education_repository_1.default.findOne({ where: { id } });
            return educationResult ?? null;
        }
    }
    async invalidateEducationCache(id) {
        try {
            const cacheKey = `${this.EDUCATION_ITEM_CACHE_PREFIX}${id}`;
            await redisClient_1.default.del(cacheKey);
        }
        catch (error) {
            console.error(`Error invalidando caché de educación ${id}`, error);
        }
    }
    async createEducation(educationData, file) {
        try {
            const imageUrl = await cloudinary_service_1.default.uploadImage(file.path);
            const newEducation = education_repository_1.default.create({
                ...educationData,
                image_url: imageUrl,
            });
            await education_repository_1.default.save(newEducation);
            await this.invalidateEducationsCache();
            return { message: "Educación creada con éxito" };
        }
        catch (error) {
            console.error("Error creando educación:", error);
            throw new Error(error instanceof Error ? error.message : "No se puedo crear la educación");
        }
    }
    async updateEducation(id, educationData, file) {
        try {
            const existingEducation = await this.getEducationById(id);
            if (!existingEducation)
                throw new Error("Educación no encontrada");
            if (file) {
                const imageToDelete = existingEducation.image_url;
                if (imageToDelete) {
                    await cloudinary_service_1.default.deleteImage(imageToDelete);
                }
                const imageUrl = await cloudinary_service_1.default.uploadImage(file.path);
                educationData.image_url = imageUrl;
            }
            await education_repository_1.default.update(id, educationData);
            await this.invalidateEducationsCache();
            await this.invalidateEducationCache(id);
            return { message: "Educación actualizada con éxito" };
        }
        catch (error) {
            console.error(`Error actualizando educación ${id}:`, error);
            throw new Error("No se pudo actualizar la educacición");
        }
    }
    async deleteEducation(id) {
        try {
            const education = await this.getEducationById(id);
            if (!education)
                throw new Error("Educación no encontrada");
            const imageToDelete = education.image_url;
            if (imageToDelete) {
                await cloudinary_service_1.default.deleteImage(imageToDelete);
            }
            await education_repository_1.default.remove(education);
            await this.invalidateEducationsCache();
            await this.invalidateEducationCache(id);
            return { message: "Educación eliminada con éxito" };
        }
        catch (error) {
            console.error(`Error eliminando educación ${id}:`, error);
            throw new Error("No se pudo eliminar la educación.");
        }
    }
}
exports.EducationService = EducationService;
