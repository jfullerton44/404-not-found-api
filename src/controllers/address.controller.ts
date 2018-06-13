import { repository } from "@loopback/repository";
import { AddressRepository } from "../repositories/address.repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Address } from "../models/address";

export class AddressController {
  constructor(
    @repository(AddressRepository.name) private addressRepo: AddressRepository,
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }


  @post('/address')
  async createNewAddress(
    @requestBody() address: Address
  ) {
    let addressExists: boolean = !!(await this.addressRepo.count({ id: address.id }));
    if (addressExists) {
      throw new HttpErrors.BadRequest('Address already exists');
    }
    return await this.addressRepo.create(address);
  }

  @get('/addresses/{userid}')
  async getAddressByUserID(@param.path.number('userid') userid: number): Promise<Address> {
    let userAddressExists: boolean = !!(await this.addressRepo.count({ user_id: userid }));
    if (!userAddressExists) {
      throw new HttpErrors.BadRequest(`Invalid user ID`);
    }
    return await this.addressRepo.findOne({ where: { user_id: userid } });
  }

  @get('/addresses/{bankid}')
  async getAddressByBankID(@param.path.number('bankid') bankid: number): Promise<Address> {
    let bankAddressExists: boolean = !!(await this.addressRepo.count({ bank_id: bankid }));
    if (!bankAddressExists) {
      throw new HttpErrors.BadRequest(`Invalid bank ID`);
    }
    return await this.addressRepo.findOne({ where: { bank_id: bankid } });
  }

  @get('/addresses/{charityid}')
  async getAddressByCharityID(@param.path.number('charityid') charityid: number): Promise<Address> {
    let charityAddressExists: boolean = !!(await this.addressRepo.count({ charity_id: charityid }));
    if (!charityAddressExists) {
      throw new HttpErrors.BadRequest(`Invalid charity ID`);
    }
    return await this.addressRepo.findOne({ where: { charity_id: charityid } });
  }

  @get('/addressses')
  async getAllAddresses(): Promise<Array<Address>> {
    return await this.addressRepo.find();
  }

}
