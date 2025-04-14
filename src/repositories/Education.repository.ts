import { AppDataSource } from "../config/data-source";
import { Education } from "../entities/Education";

const EducationRepository = AppDataSource.getRepository(Education);

export default EducationRepository;
