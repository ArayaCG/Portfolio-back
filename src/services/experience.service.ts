import { uploadToCloudinary } from "../helpers/uploadImage";
import redis from "../config/redisClient";
import { Experience } from "../entities/Experience";
import { ExperienceRepository } from "../repositories/experience.repository";
import ExperienceDto from "../dto/experience.dto";
import { Type } from "../enum/type.enum";
import * as fs from 'fs';
import path from 'path';

export class ExperienceService {
    private readonly EXPERIENCE_CACHE_KEY = "portfolio:experience";
    private readonly EXPERIENCE_CACHE_EXPIRATION = 3600;

    async getExperiences(): Promise<Experience[] | null> {
        try {
            const cachedExperiences = await redis.get(this.EXPERIENCE_CACHE_KEY);
            if (cachedExperiences) return JSON.parse(cachedExperiences);

            const experiences = await ExperienceRepository.find();
            await redis.setex(this.EXPERIENCE_CACHE_KEY, this.EXPERIENCE_CACHE_EXPIRATION, JSON.stringify(experiences));

            return experiences;
        } catch (error) {
            console.error("Error obteniendo experiencias con caché:", error);
            return await ExperienceRepository.find();
        }
    }

    async getExperienceById(id: number): Promise<Experience | null> {
        try {
            const cacheKey = `portfolio:experience:${id}`;
            const cachedExperience = await redis.get(cacheKey);
            if (cachedExperience) return JSON.parse(cachedExperience);

            const experience = await ExperienceRepository.findOne({ where: { id } });
            if (experience) await redis.setex(cacheKey, this.EXPERIENCE_CACHE_EXPIRATION, JSON.stringify(experience));

            return experience;
        } catch (error) {
            console.error(`Error obteniendo experiencia ${id} con caché:`, error);
            return await ExperienceRepository.findOne({ where: { id } });
        }
    }

    async invalidateExperiencesCache(): Promise<void> {
        try {
            await redis.del(this.EXPERIENCE_CACHE_KEY);
        } catch (error) {
            console.error("Error invalidando caché de experiencias:", error);
        }
    }

    async invalidateExperienceCache(id: number): Promise<void> {
        try {
            await redis.del(`portfolio:experience:${id}`);
        } catch (error) {
            console.error(`Error invalidando caché de experiencia ${id}:`, error);
        }
    }

    async createExperience(experienceData: ExperienceDto, files: Express.Multer.File[]): Promise<{ message: string }> {
        try {
            if (!files || files.length < 1) {
                throw new Error("Se requiere al menos una imagen");
            }
    
            const validFiles = files.filter(file => 
                file && file.path && fs.existsSync(file.path)
            );
    
            if (validFiles.length < 1) {
                throw new Error("No se encontraron archivos válidos");
            }
    
            const imageUrls = await Promise.all(
                validFiles.map(async (file) => {
                    try {
                        return await uploadToCloudinary(file.path);
                    } catch (uploadError) {
                        console.error("Error uploading file:", uploadError);
                        throw new Error("No se pudo subir la imagen");
                    }
                })
            );
    
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
                const imageUrls = await Promise.all(images.map((file) => uploadToCloudinary(file.path)));
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
