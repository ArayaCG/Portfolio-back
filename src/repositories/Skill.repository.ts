import { AppDataSource } from "../config/data-source";
import { Skill } from "../entities/Skill";

export const SkillRepository = AppDataSource.getRepository(Skill);
