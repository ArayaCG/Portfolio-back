import { AppDataSource } from "../config/data-source";
import { AboutMe } from "../entities/AboutMe";

export const AboutMeRepository = AppDataSource.getRepository(AboutMe);
