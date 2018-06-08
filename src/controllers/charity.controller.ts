import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors, param, del, patch, put } from "@loopback/rest";
import { User } from "../models/user";
import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";

export class CharityController {

  constructor(
    @repository(CharityRepository.name) private charityRepo: CharityRepository
  ) {}

  @post('/charityReg')
  async createCharity(@requestBody() charity: Charity) {

    let charityExists: boolean = !!(await this.charityRepo.count({ name: charity.name }));
    if(charityExists){
      throw new HttpErrors.BadRequest("Charity with this name already Exists");
    }
    return await this.charityRepo.create(charity);
  }

  @get('/charities')
  async getAllCharities(): Promise<Array<Charity>> {
    return await this.charityRepo.find();
  }

  @get('/charities/{id}')
  async getCharityByID(@param.path.number('id') id:number ): Promise<Charity> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest(`charity ID ${id} does not exist`);
    }
    return await this.charityRepo.findById(id);
  }
  @del('/charities/{id}')
  async deleteCharityByID(@param.path.number('id') id:number ): Promise<Boolean> {
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


}
