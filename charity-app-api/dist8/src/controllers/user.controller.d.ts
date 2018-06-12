import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Payment_MethodRepository } from "../repositories/payment_method.repository";
import { Payment_Method } from "../models/payment_method";
import { Donation } from "../models/donation";
import { DonationRepository } from "../repositories/donation.repository";
export declare class UserController {
    private userRepo;
    private payment_methodRepo;
    private donationRepo;
    constructor(userRepo: UserRepository, payment_methodRepo: Payment_MethodRepository, donationRepo: DonationRepository);
    getAllUsers(): Promise<Array<User>>;
    getUserByKey(jwt: string): Promise<any>;
    deleteUser(id: number): Promise<boolean>;
    updateUser(id: number, user: User): Promise<boolean>;
    replaceUser(id: number, user: User): Promise<boolean>;
    getDonationsByUserId(user_id: number): Promise<Array<Donation>>;
    getPayment_MethodsByUserId(user_id: number): Promise<Array<Payment_Method>>;
    getUserIdByEmail(email: string): Promise<number>;
    getUserIdByUsername(username: string): Promise<number>;
}
