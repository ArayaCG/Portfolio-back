import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";
import { generateAdminToken } from "../config/auth";

export class AuthService {
    private adminRepository = AppDataSource.getRepository(Admin);

    async login(identifier: string, password: string): Promise<{ token: string }> {
        const admin = await this.adminRepository.findOne({
            where: [{ email: identifier }, { username: identifier }],
        });

        if (!admin) {
            throw new Error("Credenciales inválidas");
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            throw new Error("Credenciales inválidas");
        }

        const token = generateAdminToken();

        admin.token = token;
        await this.adminRepository.save(admin);

        return { token };
    }

    async createInitialAdmin(username: string, email: string, password: string): Promise<Admin> {
        const existingAdmin = await this.adminRepository.findOne({
            where: [{ email }, { username }],
        });

        if (existingAdmin) {
            throw new Error("Admin ya existe");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = this.adminRepository.create({
            username,
            email,
            password: hashedPassword,
            token: generateAdminToken(),
        });

        await this.adminRepository.save(admin);

        return admin;
    }
}
