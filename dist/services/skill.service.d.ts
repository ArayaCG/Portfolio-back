import { SkillDto } from "../dto/skill.dto";
import { Skill } from "../entities/Skill";
export declare class SkillService {
    private readonly SKILL_LIST_CACHE_KEY;
    private readonly SKILL_ITEM_CACHE_PREFIX;
    private readonly SKILL_CACHE_EXPIRATION;
    getSkills(): Promise<Skill[] | null>;
    invalidateSkillsCache(): Promise<void>;
    getSkillById(id: number): Promise<Skill | null>;
    invalidateSkillCache(id: number): Promise<void>;
    createSkill(skillData: SkillDto, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    updateSkill(id: number, skillData: Partial<SkillDto>, file?: Express.Multer.File): Promise<{
        message: string;
    }>;
    deleteSkill(id: number): Promise<{
        message: string;
    }>;
}
