import { Address } from "../models/address";
import { BankRepository } from "../repositories/bank.repository";
import { BankAccount } from "../models/bankaccount";
import { BankAccountRepository } from "../repositories/bankaccount.repository";
import { Bank } from "../models/bank";
import { CharityRepository } from "../repositories/charity.repository";
import { AddressRepository } from "../repositories/address.repository";
export declare class BankController {
    private bankRepo;
    private bankaccRepo;
    private charityRepo;
    private addressRepo;
    constructor(bankRepo: BankRepository, bankaccRepo: BankAccountRepository, charityRepo: CharityRepository, addressRepo: AddressRepository);
    createNewBank(bank: Bank): Promise<Bank>;
    createNewBankAccount(bankAcc: BankAccount): Promise<Bank>;
    getBankByID(id: number): Promise<Bank>;
    getAllBanks(): Promise<Array<Bank>>;
    getBankAccountsbyBankID(bank_id: number): Promise<Array<BankAccount>>;
    getBankAccountsByAccountNum(accNum: number): Promise<Array<BankAccount>>;
    removeBankAccountbyCharityID(charity_id: number): Promise<number>;
    removeBanksbyBankID(bank_id: number): Promise<number>;
    removeBankAccount(bankacc: BankAccount): Promise<boolean>;
    getAddressforBankID(bank_id: number): Promise<Address>;
}
