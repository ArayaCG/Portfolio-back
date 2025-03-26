import { AppDataSource } from "../config/data-source";
import { Education } from "../entities/Education";

export const EducationRepository = AppDataSource.getRepository(Education);
