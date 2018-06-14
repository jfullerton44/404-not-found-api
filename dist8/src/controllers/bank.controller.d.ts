import { BankRepository } from "../repositories/bank.repository";
import { BankAccount } from "../models/bankaccount";
import { BankAccountRepository } from "../repositories/bankaccount.repository";
import { Bank } from "../models/bank";
import { CharityRepository } from "../repositories/charity.repository";
export declare class BankController {
    private bankRepo;
    private bankaccRepo;
    private charityRepo;
    constructor(bankRepo: BankRepository, bankaccRepo: BankAccountRepository, charityRepo: CharityRepository);
    createNewBank(bank: Bank): Promise<Bank>;
    createNewBankAccount(bankAcc: BankAccount): Promise<Bank>;
    getBankByID(id: number): Promise<Bank>;
    getAllBanks(): Promise<Array<Bank>>;
    getBankAccountsbyCharityID(charity_id: number): Promise<Array<BankAccount>>;
    getBankAccountsbyBankID(bank_id: number): Promise<Array<BankAccount>>;
    getBankAccountsByAccountNum(accNum: number): Promise<Array<BankAccount>>;
    removeBankAccountbyCharityID(charity_id: number): Promise<number>;
    removeBanksbyBankID(bank_id: number): Promise<number>;
    removeBankAccount(bankacc: BankAccount): Promise<boolean>;
}
