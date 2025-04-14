import { AppDataSource } from "../config/data-source";
import { AboutMe } from "../entities/AboutMe";

const AboutMeRepository = AppDataSource.getRepository(AboutMe);

export default AboutMeRepository;
