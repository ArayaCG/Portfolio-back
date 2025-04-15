import { AboutMeDto } from "../dto/aboutMe.dto";
import { AboutMe } from "../entities/AboutMe";
export declare class AboutMeService {
    private readonly ABOUT_ME_CACHE_KEY;
    private readonly ABOUT_ME_CACHE_EXPIRATION;
    getAboutMe(): Promise<AboutMe | null>;
    invalidateAboutMeCache(): Promise<void>;
    createAboutMe(aboutMeData: AboutMeDto, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    updateAboutMe(aboutMeData: Partial<AboutMeDto>, file?: Express.Multer.File): Promise<{
        message: string;
    }>;
    deleteAboutMe(): Promise<{
        message: string;
    }>;
}
export declare const aboutMeService: AboutMeService;
