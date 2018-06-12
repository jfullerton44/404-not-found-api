import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";
import { sign } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

export class LoginController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post("/login")
  async login(@requestBody() login: Login) {
    let userExists: boolean = !!(await this.userRepo.count(
        { username: login.username },
    ));

    if(!userExists){
      throw new HttpErrors.Unauthorized('Username does not exist');
    }
    let tempUser: User;

    tempUser = await this.userRepo.findOne({
      where:{
        and:[
          { username: login.username },
        ]
      }
    });
    var loginAllowed :boolean
    loginAllowed = await bcrypt.compare(login.password, tempUser.password);
    if (!loginAllowed){
      throw new HttpErrors.Unauthorized('Password incorrect');
    }

    var jwt = sign(
      {
        user: tempUser,
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
}
