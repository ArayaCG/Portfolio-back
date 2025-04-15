import { EducationDto } from "../dto/education.dto";
import { Education } from "../entities/Education";
export declare class EducationService {
    private readonly EDUCATION_LIST_CACHE_KEY;
    private readonly EDUCATION_ITEM_CACHE_PREFIX;
    private readonly EDUCATION_CACHE_EXPIRATION;
    getEducations(): Promise<Education[] | null>;
    invalidateEducationsCache(): Promise<void>;
    getEducationById(id: number): Promise<Education | null>;
    invalidateEducationCache(id: number): Promise<void>;
    createEducation(educationData: EducationDto, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    updateEducation(id: number, educationData: Partial<EducationDto>, file?: Express.Multer.File): Promise<{
        message: string;
    }>;
    deleteEducation(id: number): Promise<{
        message: string;
    }>;
}
