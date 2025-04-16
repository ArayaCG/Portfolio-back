import redisClient from "../config/redisClient";
import { SkillDto } from "../dto/skill.dto";
import { Skill } from "../entities/Skill";
import SkillRepository from "../repositories/skill.repository";

export class SkillService {
    private readonly SKILL_LIST_CACHE_KEY = "portfolio:skills:list";
    private readonly SKILL_ITEM_CACHE_PREFIX = "portfolio:skills:item:";
    private readonly SKILL_CACHE_EXPIRATION = 3600;

    async getSkills(): Promise<Skill[] | null> {
        try {
            const cachedSkills = await redisClient.get(this.SKILL_LIST_CACHE_KEY);
            if (cachedSkills) return JSON.parse(cachedSkills);

            const skills = await SkillRepository.find();

            await redisClient.setex(this.SKILL_LIST_CACHE_KEY, this.SKILL_CACHE_EXPIRATION, JSON.stringify(skills));

            return skills;
        } catch (error) {
            console.error("Error obteniendo habilidades con caché", error);
            const skillsResults = await SkillRepository.find();
            return skillsResults.length > 0 ? skillsResults : null;
        }
    }

    async invalidateSkillsCache(): Promise<void> {
        try {
            await redisClient.del(this.SKILL_LIST_CACHE_KEY);
        } catch (error) {
            console.error("Error invalidando caché de habilidades", error);
        }
    }

    async getSkillById(id: number): Promise<Skill | null> {
        try {
            const cacheKey = `${this.SKILL_ITEM_CACHE_PREFIX}${id}`;
            const cachedSkill = await redisClient.get(cacheKey);
            if (cachedSkill) return JSON.parse(cachedSkill);

            const skill = await SkillRepository.findOne({ where: { id } });
            if (skill) {
                await redisClient.setex(cacheKey, this.SKILL_CACHE_EXPIRATION, JSON.stringify(skill));
            }

            return skill;
        } catch (error) {
            console.error(`Error obtiendo habilidad ${id} con caché:`, error);
            const skillResult = await SkillRepository.findOne({ where: { id } });
            return skillResult ?? null;
        }
    }

    async invalidateSkillCache(id: number): Promise<void> {
        try {
            const cacheKey = `${this.SKILL_ITEM_CACHE_PREFIX}${id}`;
            await redisClient.del(cacheKey);
        } catch (error) {
            console.error(`Error invalidando caché de habilidad ${id}`, error);
        }
    }

    async createSkill(skillData: SkillDto): Promise<{ message: string }> {
        try {
            const newSkill = SkillRepository.create(skillData);

            await SkillRepository.save(newSkill);
            await this.invalidateSkillsCache();

            return { message: "Habilidad creada con éxito" };
        } catch (error) {
            console.error("Error creando habilidad:", error);
            throw new Error(error instanceof Error ? error.message : "No se pudo crear la habilidad");
        }
    }

    async createSkills(skillsData: SkillDto[]): Promise<{ message: string }> {
        try {
            for (const skillData of skillsData) {
                const newSkill = SkillRepository.create(skillData);
                await SkillRepository.save(newSkill);
            }

            await this.invalidateSkillsCache();

            return { message: "Habilidades creadas con éxito" };
        } catch (error) {
            console.error("Error creando habilidades:", error);
            throw new Error(error instanceof Error ? error.message : "No se pudieron crear las habilidades");
        }
    }

    async updateSkill(id: number, skillData: Partial<SkillDto>): Promise<{ message: string }> {
        try {
            const existingSkill = await this.getSkillById(id);
            if (!existingSkill) throw new Error("Habilidad no encontrada");
            await SkillRepository.update(id, skillData);
            await this.invalidateSkillsCache();
            await this.invalidateSkillCache(id);

            return { message: "Habilidad actualizada con éxito" };
        } catch (error) {
            console.error(`Error actualizando habilidad ${id}:`, error);
            throw new Error("No se pudo actualizar la habilidad");
        }
    }

    async deleteSkill(id: number): Promise<{ message: string }> {
        try {
            const skill = await this.getSkillById(id);
            if (!skill) throw new Error("Habilidad no encontrada");
            await SkillRepository.remove(skill);
            await this.invalidateSkillsCache();
            await this.invalidateSkillCache(id);

            return { message: "Habilidad eliminada con éxito" };
        } catch (error) {
            console.error(`Error eliminando habilidad ${id}:`, error);
            throw new Error("No se pudo eliminar la habilidad.");
        }
    }
}
