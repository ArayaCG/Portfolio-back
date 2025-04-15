import { Admin } from "../entities/Admin";
export declare class AuthService {
    private adminRepository;
    login(identifier: string, password: string): Promise<{
        token: string;
    }>;
    createInitialAdmin(username: string, email: string, password: string): Promise<Admin>;
}
