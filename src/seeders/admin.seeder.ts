import { AppDataSource } from "../config/data-source";
import { generateAdminToken } from "../config/auth";
import { USERNAME_ADMIN, PASSWORD_ADMIN } from "../config/envs";
import bcrypt from "bcryptjs";
import { Admin } from "../entities/Admin";

export const initializeAdmin = async () => {
    try {
        const adminRepository = AppDataSource.getRepository(Admin);

        const existingAdmin = await adminRepository.findOne({
            where: { username: USERNAME_ADMIN },
        });

        if (!PASSWORD_ADMIN) {
            throw new Error("PASSWORD_ADMIN no está definido en las variables de entorno.");
        }

        const hashedPassword = await hashPassword(PASSWORD_ADMIN);

        if (!existingAdmin) {
            const admin = adminRepository.create({
                username: USERNAME_ADMIN,
                email: `${USERNAME_ADMIN}@admin.com`,
                password: hashedPassword,
                token: generateAdminToken(),
            });

            await adminRepository.save(admin);
            console.log("Admin inicial creado");
        }
    } catch (error) {
        console.error("Error inicializando admin:", error);
    }
};

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
