import { AddressRepository } from "../repositories/address.repository";
import { UserRepository } from "../repositories/user.repository";
import { Address } from "../models/address";
export declare class AddressController {
    private addressRepo;
    private userRepo;
    constructor(addressRepo: AddressRepository, userRepo: UserRepository);
    newAddress(address: Address): Promise<Address>;
    getUserByID(id: number): Promise<Address>;
    getAllAddresses(): Promise<Array<Address>>;
}
