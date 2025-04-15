"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const redisClient_1 = __importDefault(require("../config/redisClient"));
const cloudinary_service_1 = __importDefault(require("../helpers/cloudinary.service"));
const skill_repository_1 = __importDefault(require("../repositories/skill.repository"));
class SkillService {
    constructor() {
        this.SKILL_LIST_CACHE_KEY = "portfolio:skills:list";
        this.SKILL_ITEM_CACHE_PREFIX = "portfolio:skills:item:";
        this.SKILL_CACHE_EXPIRATION = 3600;
    }
    async getSkills() {
        try {
            const cachedSkills = await redisClient_1.default.get(this.SKILL_LIST_CACHE_KEY);
            if (cachedSkills)
                return JSON.parse(cachedSkills);
            const skills = await skill_repository_1.default.find();
            await redisClient_1.default.setex(this.SKILL_LIST_CACHE_KEY, this.SKILL_CACHE_EXPIRATION, JSON.stringify(skills));
            return skills;
        }
        catch (error) {
            console.error("Error obteniendo habilidades con caché", error);
            const skillsResults = await skill_repository_1.default.find();
            return skillsResults.length > 0 ? skillsResults : null;
        }
    }
    async invalidateSkillsCache() {
        try {
            await redisClient_1.default.del(this.SKILL_LIST_CACHE_KEY);
        }
        catch (error) {
            console.error("Error invalidando caché de habilidades", error);
        }
    }
    async getSkillById(id) {
        try {
            const cacheKey = `${this.SKILL_ITEM_CACHE_PREFIX}${id}`;
            const cachedSkill = await redisClient_1.default.get(cacheKey);
            if (cachedSkill)
                return JSON.parse(cachedSkill);
            const skill = await skill_repository_1.default.findOne({ where: { id } });
            if (skill) {
                await redisClient_1.default.setex(cacheKey, this.SKILL_CACHE_EXPIRATION, JSON.stringify(skill));
            }
            return skill;
        }
        catch (error) {
            console.error(`Error obtiendo habilidad ${id} con caché:`, error);
            const skillResult = await skill_repository_1.default.findOne({ where: { id } });
            return skillResult ?? null;
        }
    }
    async invalidateSkillCache(id) {
        try {
            const cacheKey = `${this.SKILL_ITEM_CACHE_PREFIX}${id}`;
            await redisClient_1.default.del(cacheKey);
        }
        catch (error) {
            console.error(`Error invalidando caché de habilidad ${id}`, error);
        }
    }
    async createSkill(skillData, file) {
        try {
            const imageUrl = await cloudinary_service_1.default.uploadImage(file.path);
            const newEducation = skill_repository_1.default.create({
                ...skillData,
                image: imageUrl,
            });
            await skill_repository_1.default.save(newEducation);
            await this.invalidateSkillsCache();
            return { message: "Habilidad creada con éxito" };
        }
        catch (error) {
            console.error("Error creando habilidad:", error);
            throw new Error(error instanceof Error ? error.message : "No se puedo crear la habilidad");
        }
    }
    async updateSkill(id, skillData, file) {
        try {
            const existingSkill = await this.getSkillById(id);
            if (!existingSkill)
                throw new Error("Habilidad no encontrada");
            if (file) {
                const imageToDelete = existingSkill.image;
                if (imageToDelete) {
                    await cloudinary_service_1.default.deleteImage(imageToDelete);
                }
                const imageUrl = await cloudinary_service_1.default.uploadImage(file.path);
                skillData.image = imageUrl;
            }
            await skill_repository_1.default.update(id, skillData);
            await this.invalidateSkillsCache();
            await this.invalidateSkillCache(id);
            return { message: "Habilidad actualizada con éxito" };
        }
        catch (error) {
            console.error(`Error actualizando habilidad ${id}:`, error);
            throw new Error("No se pudo actualizar la habilidad");
        }
    }
    async deleteSkill(id) {
        try {
            const skill = await this.getSkillById(id);
            if (!skill)
                throw new Error("Habilidad no encontrada");
            const imageToDelete = skill.image;
            if (imageToDelete) {
                await cloudinary_service_1.default.deleteImage(imageToDelete);
            }
            await skill_repository_1.default.remove(skill);
            await this.invalidateSkillsCache();
            await this.invalidateSkillCache(id);
            return { message: "Habilidad eliminada con éxito" };
        }
        catch (error) {
            console.error(`Error eliminando habilidad ${id}:`, error);
            throw new Error("No se pudo eliminar la habilidad.");
        }
    }
}
exports.SkillService = SkillService;
