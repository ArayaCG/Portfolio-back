import { AppDataSource } from "../config/data-source";
import { Skill } from "../entities/Skill";

const SkillRepository = AppDataSource.getRepository(Skill);

export default SkillRepository;
