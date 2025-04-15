"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceService = exports.ExperienceService = void 0;
const cloudinary_service_1 = __importDefault(require("../helpers/cloudinary.service"));
const redisClient_1 = __importDefault(require("../config/redisClient"));
const fs = __importStar(require("fs"));
const experience_repository_1 = __importDefault(require("../repositories/experience.repository"));
class ExperienceService {
    constructor() {
        this.EXPERIENCE_LIST_CACHE_KEY = "portfolio:experiences:list";
        this.EXPERIENCE_ITEM_CACHE_PREFIX = "portfolio:experiences:item:";
        this.EXPERIENCE_CACHE_EXPIRATION = 3600;
    }
    async getExperiences() {
        try {
            const cachedExperiences = await redisClient_1.default.get(this.EXPERIENCE_LIST_CACHE_KEY);
            if (cachedExperiences)
                return JSON.parse(cachedExperiences);
            const experiences = await experience_repository_1.default.find();
            await redisClient_1.default.setex(this.EXPERIENCE_LIST_CACHE_KEY, this.EXPERIENCE_CACHE_EXPIRATION, JSON.stringify(experiences));
            return experiences;
        }
        catch (error) {
            console.error("Error obteniendo experiencias con caché:", error);
            const experiencesResults = await experience_repository_1.default.find();
            return experiencesResults.length > 0 ? experiencesResults : null;
        }
    }
    async invalidateExperiencesCache() {
        try {
            await redisClient_1.default.del(this.EXPERIENCE_LIST_CACHE_KEY);
        }
        catch (error) {
            console.error("Error invalidando caché de experiencias:", error);
        }
    }
    async getExperienceById(id) {
        try {
            const cacheKey = `${this.EXPERIENCE_ITEM_CACHE_PREFIX}${id}`;
            const cachedExperience = await redisClient_1.default.get(cacheKey);
            if (cachedExperience)
                return JSON.parse(cachedExperience);
            const experience = await experience_repository_1.default.findOne({ where: { id } });
            if (experience) {
                await redisClient_1.default.setex(cacheKey, this.EXPERIENCE_CACHE_EXPIRATION, JSON.stringify(experience));
            }
            return experience;
        }
        catch (error) {
            console.error(`Error obteniendo experiencia ${id} con caché:`, error);
            const experienceResult = await experience_repository_1.default.findOne({ where: { id } });
            return experienceResult ?? null;
        }
    }
    async invalidateExperienceCache(id) {
        try {
            const cacheKey = `${this.EXPERIENCE_ITEM_CACHE_PREFIX}${id}`;
            await redisClient_1.default.del(cacheKey);
        }
        catch (error) {
            console.error(`Error invalidando caché de experiencia ${id}:`, error);
        }
    }
    async createExperience(experienceData, files) {
        try {
            if (!files || files.length < 1) {
                throw new Error("Se requiere al menos una imagen");
            }
            const validFiles = files.filter((file) => file && file.path && fs.existsSync(file.path));
            if (validFiles.length < 1) {
                throw new Error("No se encontraron archivos válidos");
            }
            const imageUrls = await cloudinary_service_1.default.uploadImages(validFiles.map((file) => file.path));
            const newExperience = experience_repository_1.default.create({
                ...experienceData,
                type: experienceData.type.toLowerCase(),
                image_url: imageUrls[0],
                logo_url: imageUrls.length > 1 ? imageUrls[1] : imageUrls[0],
            });
            await experience_repository_1.default.save(newExperience);
            await this.invalidateExperiencesCache();
            return { message: "Experiencia creada con éxito" };
        }
        catch (error) {
            console.error("Error creando experiencia:", error);
            throw new Error(error instanceof Error ? error.message : "No se pudo crear la experiencia");
        }
    }
    async updateExperience(id, experienceData, images) {
        try {
            const existingExperience = await this.getExperienceById(id);
            if (!existingExperience)
                throw new Error("Experiencia no encontrada");
            if (images && images.length) {
                const imageUrls = await cloudinary_service_1.default.uploadImages(images.map((file) => file.path));
                const imagesToDelete = [existingExperience.image_url, existingExperience.logo_url].filter((url) => url);
                if (imagesToDelete.length) {
                    await cloudinary_service_1.default.deleteImages(imagesToDelete);
                }
                experienceData.logo_url = imageUrls[0] || existingExperience.logo_url;
                experienceData.image_url = imageUrls[1] || existingExperience.image_url;
            }
            await experience_repository_1.default.update(id, experienceData);
            await this.invalidateExperiencesCache();
            await this.invalidateExperienceCache(id);
            return { message: "Experiencia actualizada con éxito" };
        }
        catch (error) {
            console.error(`Error actualizando experiencia ${id}:`, error);
            throw new Error("No se pudo actualizar la experiencia.");
        }
    }
    async deleteExperience(id) {
        try {
            const experience = await this.getExperienceById(id);
            if (!experience)
                throw new Error("Experiencia no encontrada");
            const imagesToDelete = [experience.image_url, experience.logo_url].filter((url) => url);
            if (imagesToDelete.length) {
                await cloudinary_service_1.default.deleteImages(imagesToDelete);
            }
            await experience_repository_1.default.remove(experience);
            await this.invalidateExperiencesCache();
            await this.invalidateExperienceCache(id);
            return { message: "Experiencia eliminada con éxito" };
        }
        catch (error) {
            console.error(`Error eliminando experiencia ${id}:`, error);
            throw new Error("No se pudo eliminar la experiencia.");
        }
    }
}
exports.ExperienceService = ExperienceService;
exports.experienceService = new ExperienceService();
