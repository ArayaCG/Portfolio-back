import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";

const AdminRepository = AppDataSource.getRepository(Admin);

export default AdminRepository;
