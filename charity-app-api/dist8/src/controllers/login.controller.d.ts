import { UserRepository } from "../repositories/user.repository";
import { Login } from "../models/login";
export declare class LoginController {
    private userRepo;
    constructor(userRepo: UserRepository);
    login(login: Login): Promise<{
        token: string;
    }>;
}
