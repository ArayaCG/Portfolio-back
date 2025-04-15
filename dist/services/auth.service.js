"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const data_source_1 = require("../config/data-source");
const Admin_1 = require("../entities/Admin");
const auth_1 = require("../config/auth");
class AuthService {
    constructor() {
        this.adminRepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
    }
    async login(identifier, password) {
        const admin = await this.adminRepository.findOne({
            where: [{ email: identifier }, { username: identifier }],
        });
        if (!admin) {
            throw new Error("Credenciales inválidas");
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            throw new Error("Credenciales inválidas");
        }
        const token = (0, auth_1.generateAdminToken)();
        admin.token = token;
        await this.adminRepository.save(admin);
        return { token };
    }
    async createInitialAdmin(username, email, password) {
        const existingAdmin = await this.adminRepository.findOne({
            where: [{ email }, { username }],
        });
        if (existingAdmin) {
            throw new Error("Admin ya existe");
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const admin = this.adminRepository.create({
            username,
            email,
            password: hashedPassword,
            token: (0, auth_1.generateAdminToken)(),
        });
        await this.adminRepository.save(admin);
        return admin;
    }
}
exports.AuthService = AuthService;
