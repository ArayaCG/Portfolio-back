"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAdmin = void 0;
const data_source_1 = require("../config/data-source");
const auth_1 = require("../config/auth");
const envs_1 = require("../config/envs");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Admin_1 = require("../entities/Admin");
const initializeAdmin = async () => {
    try {
        const adminRepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
        const existingAdmin = await adminRepository.findOne({
            where: { username: envs_1.USERNAME_ADMIN },
        });
        if (!envs_1.PASSWORD_ADMIN) {
            throw new Error("PASSWORD_ADMIN no está definido en las variables de entorno.");
        }
        const hashedPassword = await hashPassword(envs_1.PASSWORD_ADMIN);
        if (!existingAdmin) {
            const admin = adminRepository.create({
                username: envs_1.USERNAME_ADMIN,
                email: `${envs_1.USERNAME_ADMIN}@admin.com`,
                password: hashedPassword,
                token: (0, auth_1.generateAdminToken)(),
            });
            await adminRepository.save(admin);
            console.log("Admin inicial creado");
        }
    }
    catch (error) {
        console.error("Error inicializando admin:", error);
    }
};
exports.initializeAdmin = initializeAdmin;
async function hashPassword(password) {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
}
