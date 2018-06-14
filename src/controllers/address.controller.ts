import { repository } from "@loopback/repository";
import { AddressRepository } from "../repositories/address.repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param, del } from "@loopback/rest";
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

  @get('/addresses/all')
  async getAllAddresses(): Promise<Array<Address>> {
    return await this.addressRepo.find();
  }

  @del('/address/{address_id}')
  async removeAddressByID(@param.path.number('address_id') address_id: number) {
    let addressExists: boolean = !!(await this.addressRepo.count({ id: address_id }));
    if (addressExists) {
      throw new HttpErrors.BadRequest('Address already exists');
    }
    return await this.addressRepo.deleteById(address_id);
  }

  //users/:userId/addresses

  // /users/
  // /users/{userId}

  // /address/
  // /address/{addressId}

  // /users/{userId}/addresses/{addressId}/states/{stateId}

}
