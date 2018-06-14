import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import * as bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";

export class RegistrationController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) {}

  @post('/reg/users')
  async createUser(@requestBody() user: User) {

    let hashedPassword = await bcrypt.hash(user.password,10);
    //var userToStore = new User();
    user.password= hashedPassword;

    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));
    if(userExists){
      throw new HttpErrors.BadRequest("User already Exists");
    }

    let usernameTaken: boolean = !!(await this.userRepo.count({ username: user.username }));
    if(usernameTaken){
      throw new HttpErrors.BadRequest("Username Taken")
    }

    let storedUser = await this.userRepo.create(user);
    storedUser.password="";
    var jwt = sign(
      {
        user: user
      },
      'shh',
      {
        issuer: 'auth.ix.co.za',
        audience: 'ix.co.za',
      },
    );

    return {
      token: jwt,
    };
  }

  @get('/reg/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }
}
