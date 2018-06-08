import { repository } from "@loopback/repository";
import { AddressRepository } from "../repositories/address.repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Address } from "../models/address";

export class AddressController {
  constructor(
    @repository(AddressRepository.name) private addressRepo: AddressRepository,
    @repository(UserRepository.name) private userRepo: UserRepository
  ) {}


  @post('/address')
  async newAddress(
  @requestBody() address: Address
  ){
    let userExists: boolean = !!(await this.userRepo.count({ id: address.user_id }));
    if(!userExists){
      throw new HttpErrors.Unauthorized('User Does not exist');
    }

    return await this.addressRepo.create(address);
  }

  @get('/addresses/{id}')
  async getUserByID(@param.path.number('id') id:number ): Promise<Address> {
    let addressExists: boolean = !!(await this.addressRepo.count({ id }));
    if (!addressExists) {
      throw new HttpErrors.BadRequest(`address ID ${id} does not exist`);
    }
    return await this.addressRepo.findById(id);
  }

  @get('/addressses')
  async getAllAddresses(): Promise<Array<Address>> {
    return await this.addressRepo.find();
  }

}
