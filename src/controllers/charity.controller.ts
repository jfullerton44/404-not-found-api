import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param, del, patch, put } from "@loopback/rest";
import { User } from "../models/user";
import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
import { Address } from "../models/address";
import { AddressRepository } from "../repositories/address.repository";
import { BankAccount } from "../models/bankaccount";
import { BankAccountRepository } from "../repositories/bankaccount.repository";

export class CharityController {

  constructor(
    @repository(CharityRepository.name) private charityRepo: CharityRepository,
    @repository(AddressRepository.name) private addressRepo: AddressRepository,
    @repository(BankAccountRepository.name) private bankaccRepo: BankAccountRepository
  ) { }

  @post('/charityReg')
  async createCharity(@requestBody() charity: Charity) {

    let charityExists: boolean = !!(await this.charityRepo.count({ name: charity.name }));
    if (charityExists) {
      throw new HttpErrors.BadRequest("Charity with this name already Exists");
    }
    return await this.charityRepo.create(charity);
  }

  @get('/charities')
  async getAllCharities(): Promise<Array<Charity>> {
    return await this.charityRepo.find();
  }

  @get('/charities/{id}')
  async getCharityByID(@param.path.number('id') id: number): Promise<Charity> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest(`charity ID ${id} does not exist`);
    }
    return await this.charityRepo.findById(id);
  }
  @del('/charities/{id}')
  async deleteCharityByID(@param.path.number('id') id: number): Promise<Boolean> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest(`charity ID ${id} does not exist`);
    }
    return await this.charityRepo.deleteById(id);
  }

  @patch('/charities/{id}')
  async updateCharity(
    @param.path.number('id') id: number,
    @requestBody() charity: Charity,
  ): Promise<boolean> {
    id = +id;
    return await this.charityRepo.updateById(id, charity);
  }

  @put('/charities/{id}')
  async replaceCharity(
    @param.path.number('id') id: number,
    @requestBody() charity: Charity,
  ): Promise<boolean> {
    id = +id;
    return await this.charityRepo.replaceById(id, charity);
  }

  @get('/charities/{charity_id}/address')
  async getAddressforCharityID(
    @param.path.number('charity_id') charity_id: number
  ): Promise<Address> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest('Invalid charity ID');
    }
    let addressExists: boolean = !!(await this.addressRepo.count({ chartiy_id: charity_id }));
    if (!addressExists) {
      throw new HttpErrors.BadRequest('No address registered for Charity ID');
    }
    return this.addressRepo.findOne({ where: { charity_id: charity_id } });
  }

  @get('/charities/{charity_id}/bankaccounts')
  async getBankAccountsForCharityID(@param.query.number('charity_id') charity_id: number): Promise<Array<BankAccount>> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest("Charity does not exist")
    }
    return await this.bankaccRepo.find({ where: { charity_id: charity_id } });
  }
}
