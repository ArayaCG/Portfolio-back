import CloudinaryService from "../helpers/cloudinary.service";
import redisClient from "../config/redisClient";
import { Experience } from "../entities/Experience";
import { ExperienceDto } from "../dto/experience.dto";
import { Type } from "../enum/type.enum";
import * as fs from "fs";
import ExperienceRepository from "../repositories/experience.repository";

export class ExperienceService {
    private readonly EXPERIENCE_LIST_CACHE_KEY = "portfolio:experiences:list";
    private readonly EXPERIENCE_ITEM_CACHE_PREFIX = "portfolio:experiences:item:";
    private readonly EXPERIENCE_CACHE_EXPIRATION = 3600;

    async getExperiences(): Promise<Experience[] | null> {
        try {
            const cachedExperiences = await redisClient.get(this.EXPERIENCE_LIST_CACHE_KEY);
            if (cachedExperiences) return JSON.parse(cachedExperiences);

            const experiences = await ExperienceRepository.find();
            await redisClient.setex(
                this.EXPERIENCE_LIST_CACHE_KEY,
                this.EXPERIENCE_CACHE_EXPIRATION,
                JSON.stringify(experiences)
            );

            return experiences;
        } catch (error) {
            console.error("Error obteniendo experiencias con caché:", error);
            const experiencesResults = await ExperienceRepository.find();
            return experiencesResults.length > 0 ? experiencesResults : null;
        }
    }

    async invalidateExperiencesCache(): Promise<void> {
        try {
            await redisClient.del(this.EXPERIENCE_LIST_CACHE_KEY);
        } catch (error) {
            console.error("Error invalidando caché de experiencias:", error);
        }
    }

    async getExperienceById(id: number): Promise<Experience | null> {
        try {
            const cacheKey = `${this.EXPERIENCE_ITEM_CACHE_PREFIX}${id}`;
            const cachedExperience = await redisClient.get(cacheKey);
            if (cachedExperience) return JSON.parse(cachedExperience);

            const experience = await ExperienceRepository.findOne({ where: { id } });
            if (experience) {
                await redisClient.setex(cacheKey, this.EXPERIENCE_CACHE_EXPIRATION, JSON.stringify(experience));
            }

            return experience;
        } catch (error) {
            console.error(`Error obteniendo experiencia ${id} con caché:`, error);
            const experienceResult = await ExperienceRepository.findOne({ where: { id } });
            return experienceResult ?? null;
        }
    }

    async invalidateExperienceCache(id: number): Promise<void> {
        try {
            const cacheKey = `${this.EXPERIENCE_ITEM_CACHE_PREFIX}${id}`;
            await redisClient.del(cacheKey);
        } catch (error) {
            console.error(`Error invalidando caché de experiencia ${id}:`, error);
        }
    }

    async createExperience(experienceData: ExperienceDto, files: Express.Multer.File[]): Promise<{ message: string }> {
        try {
            if (!files || files.length < 1) {
                throw new Error("Se requiere al menos una imagen");
            }

            const validFiles = files.filter((file) => file && file.path && fs.existsSync(file.path));

            if (validFiles.length < 1) {
                throw new Error("No se encontraron archivos válidos");
            }

            const imageUrls = await CloudinaryService.uploadImages(validFiles.map((file) => file.path));

            const newExperience = ExperienceRepository.create({
                ...experienceData,
                type: experienceData.type.toLowerCase() as Type,
                image_url: imageUrls[0],
                logo_url: imageUrls.length > 1 ? imageUrls[1] : imageUrls[0],
            });

            await ExperienceRepository.save(newExperience);
            await this.invalidateExperiencesCache();

            return { message: "Experiencia creada con éxito" };
        } catch (error) {
            console.error("Error creando experiencia:", error);
            throw new Error(error instanceof Error ? error.message : "No se pudo crear la experiencia");
        }
    }

    async updateExperience(
        id: number,
        experienceData: Partial<ExperienceDto>,
        images?: Express.Multer.File[]
    ): Promise<{ message: string }> {
        try {
            const existingExperience = await this.getExperienceById(id);
            if (!existingExperience) throw new Error("Experiencia no encontrada");

            if (images && images.length) {
                const imageUrls = await CloudinaryService.uploadImages(images.map((file) => file.path));
                const imagesToDelete = [existingExperience.image_url, existingExperience.logo_url].filter((url) => url);
                if (imagesToDelete.length) {
                    await CloudinaryService.deleteImages(imagesToDelete);
                }
                experienceData.logo_url = imageUrls[0] || existingExperience.logo_url;
                experienceData.image_url = imageUrls[1] || existingExperience.image_url;
            }

            await ExperienceRepository.update(id, experienceData);
            await this.invalidateExperiencesCache();
            await this.invalidateExperienceCache(id);

            return { message: "Experiencia actualizada con éxito" };
        } catch (error) {
            console.error(`Error actualizando experiencia ${id}:`, error);
            throw new Error("No se pudo actualizar la experiencia.");
        }
    }

    async deleteExperience(id: number): Promise<{ message: string }> {
        try {
            const experience = await this.getExperienceById(id);
            if (!experience) throw new Error("Experiencia no encontrada");

            const imagesToDelete = [experience.image_url, experience.logo_url].filter((url) => url);
            if (imagesToDelete.length) {
                await CloudinaryService.deleteImages(imagesToDelete);
            }

            await ExperienceRepository.remove(experience);
            await this.invalidateExperiencesCache();
            await this.invalidateExperienceCache(id);

            return { message: "Experiencia eliminada con éxito" };
        } catch (error) {
            console.error(`Error eliminando experiencia ${id}:`, error);
            throw new Error("No se pudo eliminar la experiencia.");
        }
    }
}

export const experienceService = new ExperienceService();
