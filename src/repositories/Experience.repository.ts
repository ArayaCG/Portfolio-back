import { AppDataSource } from "../config/data-source";
import { Experience } from "../entities/Experience";

const ExperienceRepository = AppDataSource.getRepository(Experience);

export default ExperienceRepository;
