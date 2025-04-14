import redis from "../config/redisClient";
import { EducationDto } from "../dto/education.dto";
import { Education } from "../entities/Education";
import CloudinaryService from "../helpers/cloudinary.service";
import EducationRepository from "../repositories/education.repository";

export class EducationService {
    private readonly EDUCATION_LIST_CACHE_KEY = "portfolio:educations:list";
    private readonly EDUCATION_ITEM_CACHE_PREFIX = "portfolio:educations:item:";
    private readonly EDUCATION_CACHE_EXPIRATION = 3600;

    async getEducations(): Promise<Education[] | null> {
        try {
            const cachedEducations = await redis.get(this.EDUCATION_LIST_CACHE_KEY);
            if (cachedEducations) return JSON.parse(cachedEducations);

            const educations = await EducationRepository.find();
            await redis.setex(
                this.EDUCATION_LIST_CACHE_KEY,
                this.EDUCATION_CACHE_EXPIRATION,
                JSON.stringify(educations)
            );

            return educations;
        } catch (error) {
            console.error("Error obteniendo educación con caché", error);
            const educationsResults = await EducationRepository.find();
            return educationsResults.length > 0 ? educationsResults : null;
        }
    }

    async invalidateEducationsCache(): Promise<void> {
        try {
            await redis.del(this.EDUCATION_LIST_CACHE_KEY);
        } catch (error) {
            console.error("Error invalidando caché de educación", error);
        }
    }

    async getEducationById(id: number): Promise<Education | null> {
        try {
            const cacheKey = `${this.EDUCATION_ITEM_CACHE_PREFIX}${id}`;
            const cachedEducation = await redis.get(cacheKey);
            if (cachedEducation) return JSON.parse(cachedEducation);

            const education = await EducationRepository.findOne({ where: { id } });
            if (education) {
                await redis.setex(cacheKey, this.EDUCATION_CACHE_EXPIRATION, JSON.stringify(education));
            }

            return education;
        } catch (error) {
            console.error(`Error obteniendo educación ${id} con caché:`, error);
            const educationResult = await EducationRepository.findOne({ where: { id } });
            return educationResult ?? null;
        }
    }

    async invalidateEducationCache(id: number): Promise<void> {
        try {
            const cacheKey = `${this.EDUCATION_ITEM_CACHE_PREFIX}${id}`;
            await redis.del(cacheKey);
        } catch (error) {
            console.error(`Error invalidando caché de educación ${id}`, error);
        }
    }

    async createEducation(educationData: EducationDto, file: Express.Multer.File): Promise<{ message: string }> {
        try {
            const imageUrl = await CloudinaryService.uploadImage(file.path);

            const newEducation = EducationRepository.create({
                ...educationData,
                image_url: imageUrl,
            });

            await EducationRepository.save(newEducation);
            await this.invalidateEducationsCache();

            return { message: "Educación creada con éxito" };
        } catch (error) {
            console.error("Error creando educación:", error);
            throw new Error(error instanceof Error ? error.message : "No se puedo crear la educación");
        }
    }

    async updateEducation(
        id: number,
        educationData: Partial<EducationDto>,
        file?: Express.Multer.File
    ): Promise<{ message: string }> {
        try {
            const existingEducation = await this.getEducationById(id);
            if (!existingEducation) throw new Error("Educación no encontrada");

            if (file) {
                const imageToDelete = existingEducation.image_url;
                if (imageToDelete) {
                    await CloudinaryService.deleteImage(imageToDelete);
                }

                const imageUrl = await CloudinaryService.uploadImage(file.path);
                educationData.image_url = imageUrl;
            }

            await EducationRepository.update(id, educationData);
            await this.invalidateEducationsCache();
            await this.invalidateEducationCache(id);

            return { message: "Educación actualizada con éxito" };
        } catch (error) {
            console.error(`Error actualizando educación ${id}:`, error);
            throw new Error("No se pudo actualizar la educacición");
        }
    }

    async deleteEducation(id: number): Promise<{ message: string }> {
        try {
            const education = await this.getEducationById(id);
            if (!education) throw new Error("Educación no encontrada");

            const imageToDelete = education.image_url;
            if (imageToDelete) {
                await CloudinaryService.deleteImage(imageToDelete);
            }

            await EducationRepository.remove(education);
            await this.invalidateEducationsCache();
            await this.invalidateEducationCache(id);

            return { message: "Educación eliminada con éxito" };
        } catch (error) {
            console.error(`Error eliminando educación ${id}:`, error);
            throw new Error("No se pudo eliminar la educación.");
        }
    }
}
