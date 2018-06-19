import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { Payment_MethodRepository } from "../repositories/payment_method.repository";
import { Payment_Method } from "../models/payment_method";
import { Donation } from "../models/donation";
import { DonationRepository } from "../repositories/donation.repository";
import { AddressRepository } from "../repositories/address.repository";
import { Address } from "../models/address";
import { RolemapRepository } from "../repositories/roleMap.repository";
export declare class UserController {
    private userRepo;
    private payment_methodRepo;
    private donationRepo;
    private addressRepo;
    private rolemapRepo;
    constructor(userRepo: UserRepository, payment_methodRepo: Payment_MethodRepository, donationRepo: DonationRepository, addressRepo: AddressRepository, rolemapRepo: RolemapRepository);
    getAllUsers(): Promise<Array<User>>;
    getUserByKey(jwt: any): Promise<any>;
    deleteUser(id: number): Promise<boolean>;
    updateUser(id: number, user: User): Promise<boolean>;
    replaceUser(id: number, user: User): Promise<boolean>;
    getDonationsByUserId(user_id: number): Promise<Array<Donation>>;
    getPayment_MethodsByUserId(user_id: number): Promise<Array<Payment_Method>>;
    getUserIdByEmail(email: string): Promise<number>;
    getUserIdByUsername(username: string): Promise<number>;
    getAddressforUserID(user_id: number): Promise<Address>;
    getRoleIDsforUserID(user_id: number): Promise<Array<Number>>;
    removeRolesByUserID(user_id: number): Promise<number>;
}
