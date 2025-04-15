import { Experience } from "../entities/Experience";
import { ExperienceDto } from "../dto/experience.dto";
export declare class ExperienceService {
    private readonly EXPERIENCE_LIST_CACHE_KEY;
    private readonly EXPERIENCE_ITEM_CACHE_PREFIX;
    private readonly EXPERIENCE_CACHE_EXPIRATION;
    getExperiences(): Promise<Experience[] | null>;
    invalidateExperiencesCache(): Promise<void>;
    getExperienceById(id: number): Promise<Experience | null>;
    invalidateExperienceCache(id: number): Promise<void>;
    createExperience(experienceData: ExperienceDto, files: Express.Multer.File[]): Promise<{
        message: string;
    }>;
    updateExperience(id: number, experienceData: Partial<ExperienceDto>, images?: Express.Multer.File[]): Promise<{
        message: string;
    }>;
    deleteExperience(id: number): Promise<{
        message: string;
    }>;
}
export declare const experienceService: ExperienceService;
