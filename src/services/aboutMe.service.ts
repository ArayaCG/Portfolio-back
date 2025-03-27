import redis from "../config/redisClient";
import AboutMeDto from "../dto/aboutMe.dto";
import { AboutMe } from "../entities/AboutMe";
import { uploadToCloudinary } from "../helpers/uploadImage";
import { AboutMeRepository } from "../repositories/aboutMe.repository";

export class AboutMeService {
    private readonly ABOUT_ME_CACHE_KEY = "portfolio:aboutMe";
    private readonly ABOUT_ME_CACHE_EXPIRATION = 3600;

    async getAboutMe(): Promise<AboutMe | null> {
        try {
            const cachedAboutMe = await redis.get(this.ABOUT_ME_CACHE_KEY);
    
            if (cachedAboutMe) {
                return JSON.parse(cachedAboutMe);
            }
    
            const aboutMeResults = await AboutMeRepository.find();
    
            // Si no hay resultados, retorna null
            if (aboutMeResults.length === 0) {
                return null;
            }
    
            // Toma el primer resultado directamente
            const aboutMe = aboutMeResults[0];
    
            await redis.setex(
                this.ABOUT_ME_CACHE_KEY, 
                this.ABOUT_ME_CACHE_EXPIRATION, 
                JSON.stringify(aboutMe)
            );
    
            return aboutMe;
        } catch (error) {
            console.error("Error obteniendo About Me con caché:", error);
            
            const aboutMeResults = await AboutMeRepository.find();
            
            return aboutMeResults.length > 0 ? aboutMeResults[0] : null;
        }
    }
}
