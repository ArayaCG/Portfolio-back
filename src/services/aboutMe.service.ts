import AboutMeRepository from "src/repositories/aboutMe.repository";
import redis from "../config/redisClient";
import { AboutMeDto } from "../dto/aboutMe.dto";
import { AboutMe } from "../entities/AboutMe";
import { CloudinaryService } from "../helpers/cloudinary.service";

export class AboutMeService {
    private readonly ABOUT_ME_CACHE_KEY = "portfolio:about-me:single";
    private readonly ABOUT_ME_CACHE_EXPIRATION = 3600;

    async getAboutMe(): Promise<AboutMe | null> {
        try {
            const cachedAboutMe = await redis.get(this.ABOUT_ME_CACHE_KEY);

            if (cachedAboutMe) {
                return JSON.parse(cachedAboutMe);
            }

            const aboutMeResults = await AboutMeRepository.find();

            if (aboutMeResults.length === 0) {
                return null;
            }

            const aboutMe = aboutMeResults[0];

            await redis.setex(this.ABOUT_ME_CACHE_KEY, this.ABOUT_ME_CACHE_EXPIRATION, JSON.stringify(aboutMe));

            return aboutMe;
        } catch (error) {
            console.error("Error obteniendo About Me con caché:", error);

            const aboutMeResults = await AboutMeRepository.find();

            return aboutMeResults.length > 0 ? aboutMeResults[0] : null;
        }
    }

    async invalidateAboutMeCache(): Promise<void> {
        try {
            await redis.del(this.ABOUT_ME_CACHE_KEY);
        } catch (error) {
            console.error("Error invalidando caché de About Me:", error);
        }
    }

    async createAboutMe(aboutMeData: AboutMeDto, file: Express.Multer.File): Promise<{ message: string }> {
        try {
            const imageUrl = await CloudinaryService.uploadImage(file.path);

            const newAboutMe = AboutMeRepository.create({
                ...aboutMeData,
                image: imageUrl,
            });

            await AboutMeRepository.save(newAboutMe);
            await this.invalidateAboutMeCache();

            return { message: "About Me creado con éxito" };
        } catch (error) {
            console.error("Error creando about me:", error);
            throw new Error(error instanceof Error ? error.message : "No se pudo crear el about me");
        }
    }

    async updateAboutMe(aboutMeData: Partial<AboutMeDto>, file?: Express.Multer.File): Promise<{ message: string }> {
        try {
            const existingAboutMe = await this.getAboutMe();
            if (!existingAboutMe) throw new Error("About Me no encontrado");

            if (file) {
                const imageUrl = await CloudinaryService.uploadImage(file.path);

                if (existingAboutMe.image) {
                    await CloudinaryService.deleteImage(existingAboutMe.image);
                }

                aboutMeData.image = imageUrl;
            }

            await AboutMeRepository.update(existingAboutMe.id, aboutMeData);
            await this.invalidateAboutMeCache();

            return { message: "About me actualizado con éxito" };
        } catch (error) {
            console.error(`Error actualizando about me`, error);
            throw new Error("No se pudo actualizar el about me.");
        }
    }

    async deleteAboutMe(): Promise<{ message: string }> {
        try {
            const aboutMe = await this.getAboutMe();
            if (!aboutMe) throw new Error("About me no encontrado");

            if (aboutMe.image) {
                await CloudinaryService.deleteImage(aboutMe.image);
            }

            await AboutMeRepository.remove(aboutMe);
            await this.invalidateAboutMeCache();

            return { message: "About me eliminado con éxito" };
        } catch (error) {
            console.error(`Error eliminando about me`, error);
            throw new Error("No se pudo eliminar about me.");
        }
    }
}

export const aboutMeService = new AboutMeService();
