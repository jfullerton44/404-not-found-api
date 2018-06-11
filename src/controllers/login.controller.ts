import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { Login } from "../models/login";
import { sign } from "jsonwebtoken";

export class LoginController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post("/login")
  async login(@requestBody() login: Login) {


    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { username: login.username },
        { password: login.password },
      ],
    }));

    if(!userExists){
      throw new HttpErrors.Unauthorized('Username or Password incorrect');
    }
    let tempUser: User;

    tempUser = await this.userRepo.findOne({
      where:{
        and:[
          { email: login.email },
          { password: login.password }
        ]
      }
    });
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
