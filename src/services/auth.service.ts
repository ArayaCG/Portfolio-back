import bcrypt from "bcryptjs";
import { AdminRepository } from "../repositories/Admin.repository";
import { generateAdminToken } from "../config/auth";

export class AuthService {
    async login(identifier: string, password: string) {
        const admin = await AdminRepository.findOne({
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
        await AdminRepository.save(admin);

        return { token };
    }

    async createInitialAdmin(username: string, email: string, password: string) {
        const existingAdmin = await AdminRepository.findOne({
            where: [{ email }, { username }],
        });

        if (existingAdmin) {
            throw new Error("Admin ya existe");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = AdminRepository.create({
            username,
            email,
            password: hashedPassword,
            token: generateAdminToken(),
        });

        await AdminRepository.save(admin);

        return admin;
    }
}
