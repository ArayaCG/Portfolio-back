import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";

export const AdminRepository = AppDataSource.getRepository(Admin);
