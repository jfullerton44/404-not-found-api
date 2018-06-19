import { AddressRepository } from "../repositories/address.repository";
import { UserRepository } from "../repositories/user.repository";
import { Address } from "../models/address";
export declare class AddressController {
    private addressRepo;
    private userRepo;
    constructor(addressRepo: AddressRepository, userRepo: UserRepository);
    createNewAddress(address: Address): Promise<Address>;
    getAllAddresses(): Promise<Array<Address>>;
    removeAddressByID(address_id: number): Promise<boolean>;
}
