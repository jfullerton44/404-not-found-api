import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";

export class RegistrationController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) {}

  @post('/reg/users')
  async createUser(@requestBody() user: User) {

    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));
    if(userExists){
      throw new HttpErrors.BadRequest("User already Exists");
    }

    let usernameTaken: boolean = !!(await this.userRepo.count({ username: user.username }));
    if(usernameTaken){
      throw new HttpErrors.BadRequest("Username Taken")
    }

    return await this.userRepo.create(user);
  }

  @get('/reg/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }
}
