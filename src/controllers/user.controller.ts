import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";

import { post, get, requestBody, param, del, HttpErrors, patch, put } from "@loopback/rest";
import { User } from "../models/user";
import { Payment_MethodRepository } from "../repositories/payment_method.repository";
import { Payment_Method } from "../models/payment_method";
import { Donation } from "../models/donation";
import { DonationRepository } from "../repositories/donation.repository";
import { verify } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { AddressRepository } from "../repositories/address.repository";
import { Address } from "../models/address";
import { RolemapRepository } from "../repositories/roleMap.repository";

export class UserController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(Payment_MethodRepository.name) private payment_methodRepo: Payment_MethodRepository,
    @repository(DonationRepository.name) private donationRepo: DonationRepository,
    @repository(AddressRepository.name) private addressRepo: AddressRepository,
    @repository(RolemapRepository.name) private rolemapRepo: RolemapRepository
  ) { }

  @get('/users/all')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }

  @get('/users')
  async getUserByKey(@param.query.string('jwt') jwt:any ): Promise<any> {
    if (!jwt) {
      throw new HttpErrors.Unauthorized(`Need a jwt`);
    }
    try{
      var jwtBody = verify(jwt,'shh');
      return jwtBody;
    }
    catch (err) {
      throw new HttpErrors.BadRequest('JWT invalid')
    }
  }

  @del('/users/{id}')
  async deleteUser(@param.path.number('id') id: number): Promise<boolean> {
    let userExists: boolean = !!(await this.userRepo.count({ id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
    }
    return await this.userRepo.deleteById(id);
  }

  @patch('/users/{id}')
  async updateUser(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<boolean> {
    id = +id;
    return await this.userRepo.updateById(id, user);
  }

  @put('/users/{id}')
  async replaceUser(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<boolean> {
    id = +id;
    return await this.userRepo.replaceById(id, user);
  }

  @get('users/{user_id}/donations')
  async getDonationsByUserId(
    @param.path.number('user_id') user_id: number
  ): Promise<Array<Donation>> {
    let userExists: boolean = !!(await this.donationRepo.count({ user_id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest(`user ID ${user_id} does not have a donation`);
    }
    return await this.donationRepo.find({ where: { user_id: user_id } });
  }

  @get('/users/{user_id}/payment_methods')
  async getPayment_MethodsByUserId(
    @param.path.number('user_id') user_id: number
  ): Promise<Array<Payment_Method>> {
    let userExists: boolean = !!(await this.payment_methodRepo.count({ user_id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest(`user ID ${user_id} does not have a payment method`);
    }

    return await this.payment_methodRepo.find({ where: { user_id: user_id } });
  }

  @get('user/email/{email}')
  async getUserIdByEmail(
    @param.path.string('email') email: string
  ): Promise<number> {
    let userExists: boolean = !!(await this.userRepo.count({ email: email }));
    if (!userExists) {
      throw new HttpErrors.BadRequest(`email ${email} does not exist`);
    }
    let returnUser = await this.userRepo.findOne({ where: { email: email } });
    return returnUser.id;
  }


  @get('userId/username/{username}')
  async getUserIdByUsername(
    @param.path.string('username') username: string
  ): Promise<number> {
    let userExists: boolean = !!(await this.userRepo.count({ username: username }));
    if (!userExists) {
      throw new HttpErrors.BadRequest(`username ${username} does not exist`);
    }
    let returnUser = await this.userRepo.findOne({ where: { username: username } });
    return returnUser.id;
  }

  @get('/users/{user_id}/address')
  async getAddressforUserID(
    @param.path.number('user_id') user_id: number
  ): Promise<Address> {
    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest('Invalid user ID');
    }
    let addressExists: boolean = !!(await this.addressRepo.count({ user_id: user_id }));
    if (!addressExists) {
      throw new HttpErrors.BadRequest('No address registered for User ID');
    }
    return this.addressRepo.findOne({ where: { user_id: user_id } });
  }

  @get('/users/{user_id}/roles')
  async getRoleIDsforUserID(
    @param.path.number('user_id') user_id: number
  ): Promise<Array<Number>> {
    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest('Invalid user ID');
    }
    let rMapArr = await this.rolemapRepo.find({ where: { user_id: user_id } });
    return rMapArr.map(r => r.role_id);
  }

  @del('/users/{user_id}/roles')
  async removeRolesByUserID(@param.path.number('user_id') user_id: number) {
    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest("Invalid user ID");
    }
    return await this.rolemapRepo.deleteAll({ where: { user_id: user_id } });
  }
}
