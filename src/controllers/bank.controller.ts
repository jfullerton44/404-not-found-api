import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param, del } from "@loopback/rest";
import { Address } from "../models/address";
import { BankRepository } from "../repositories/bank.repository";
import { BankAccount } from "../models/bankaccount";
import { BankAccountRepository } from "../repositories/bankaccount.repository";
import { Bank } from "../models/bank";
import { CharityRepository } from "../repositories/charity.repository";

export class BankController {
  constructor(
    @repository(BankRepository.name) private bankRepo: BankRepository,
    @repository(BankAccountRepository.name) private bankaccRepo: BankAccountRepository,
    @repository(CharityRepository.name) private charityRepo: CharityRepository
  ) { }


  @post('/bank')
  async createNewBank(
    @requestBody() bank: Bank
  ) {
    let bankExists: boolean = !!(await this.bankRepo.count({ id: bank.id }));
    if (bankExists) {
      throw new HttpErrors.BadRequest('Bank already exists');
    }
    return await this.bankRepo.create(bank);
  }

  @get('/bank/{id}')
  async getBankByID(@param.path.number('id') id: number): Promise<Bank> {
    let bankExists: boolean = !!(await this.bankRepo.count({ id: id }));
    if (!bankExists) {
      throw new HttpErrors.BadRequest(`Invalid bank ID`);
    }
    return await this.bankRepo.findById(id);
  }

  @get('/banks')
  async getAllBanks(): Promise<Array<Bank>> {
    return await this.bankRepo.find();
  }

  @get('/bankaccounts/{charity_id}')
  async getBankAccountsbyCharityID(@param.path.number('charity_id') charity_id: number): Promise<Array<BankAccount>> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest("Charity does not exist")
    }
    return await this.bankaccRepo.find({ where: { charity_id: charity_id } });
  }

  @get('/bankaccounts/{bank_id}')
  async getBankAccountsbyBankID(@param.path.number('bank_id') bank_id: number): Promise<Array<BankAccount>> {
    let charityExists: boolean = !!(await this.bankRepo.count({ id: bank_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest("Bank does not exist")
    }
    return await this.bankaccRepo.find({ where: { bank_id: bank_id } });
  }

  @get('/bankaccounts/{accNum}')
  async getBankAccountsByAccountNum(@param.path.number('accNum') accNum: number): Promise<Array<BankAccount>> {
    let accountExists: boolean = !!(await this.bankaccRepo.count({ accountNum: accNum }));
    if (!accountExists) {
      throw new HttpErrors.BadRequest("Account does not exist")
    }
    return await this.bankaccRepo.find({ where: { accountNum: accNum } });
  }

  @del('/bank/{charity_id}')
  async removeBanksbyCharityID(@param.path.number('charity_id') charity_id: number) {
    let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest("Charity does not exist");
    }
    return await this.bankaccRepo.deleteAll({ where: { charity_id: charity_id } });
  }

  @del('/bank/{bank_id}')
  async removeBanksbyBankID(@param.path.number('bank_id') bank_id: number) {
    let bankExists: boolean = !!(await this.bankRepo.count({ id: bank_id }));
    if (!bankExists) {
      throw new HttpErrors.BadRequest("Bank does not exist");
    }
    return await this.bankaccRepo.deleteAll({ where: { bank_id: bank_id } });
  }

  @del('/keywordmap')
  async removeBankAccount(@requestBody() bankacc: BankAccount) {
    let bankExists: boolean = !!(await this.bankaccRepo.count({ bank_id: bankacc.bank_id }));
    if (!bankExists) {
      throw new HttpErrors.BadRequest("Invalid bank ID");
    }
    let charityExists: boolean = !!(await this.bankaccRepo.count({ charity_id: bankacc.charity_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest("Invalid charity ID");
    }
    return await this.bankaccRepo.delete(bankacc);
  }
}
