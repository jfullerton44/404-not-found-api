import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param, del } from "@loopback/rest";
import { RoleRepository } from "../repositories/role.repository";
import { Rolemap } from "../models/roleMap";
import { RolemapRepository } from "../repositories/roleMap.repository";
import { UserRepository } from "../repositories/user.repository";
import { Role } from "../models/role";
import { User } from "../models/user";


export class RoleController {

  constructor(
    @repository(RoleRepository.name) private roleRepo: RoleRepository,
    @repository(RolemapRepository.name) private rolemapRepo: RolemapRepository,
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @get('role/{role}')
  async getIDbyRole(@param.path.string('role') role: string): Promise<Role> {
    let roleExists = !!(await this.roleRepo.count({ name: role }))
    if (!roleExists) {
      throw new HttpErrors.BadRequest("Role does not exist");
    }
    return await this.roleRepo.findOne({
      where: {
        name: role
      }
    }
    )
  };

  @get('role/{id}')
  async getRoleByID(@param.path.number('id') id: number): Promise<Role> {
    let roleExists = !!(await this.roleRepo.count({ id: id }));
    if (!roleExists) {
      throw new HttpErrors.BadRequest("Invalid role ID");
    }
    return await this.roleRepo.findOne({
      where: {
        id: id
      }
    }
    );
  }

  @post('/role')
  async createNewRole(
    @requestBody() role: Role
  ) {
    let roleExists: boolean = !!(await this.roleRepo.count({ name: role.name }));
    if (roleExists) {
      throw new HttpErrors.BadRequest('Role exists');
    }
    return await this.roleRepo.create(role);
  }

  @post('/rolemap')
  async createRoleMap(@requestBody() role: Role, user: User) {
    let roleExists: boolean = !!(await this.roleRepo.count({ id: role.id }));
    if (!roleExists) {
      throw new HttpErrors.BadRequest("Role does not exist");
    }
    let userExists: boolean = !!(await this.userRepo.count({ id: user.id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest("User does not exist");
    }
    let newRMap = new Rolemap;
    newRMap.user_id = user.id;
    newRMap.role_id = role.id;
    return await this.rolemapRepo.create(newRMap);
  }

  @get('/rolemap/{role_id}')
  async getUserIDsByRoleID(@param.path.number('role_id') role_id: number): Promise<Array<Number>> {
    let roleExists: boolean = !!(await this.roleRepo.count({ id: role_id }));
    if (!roleExists) {
      throw new HttpErrors.BadRequest("Role does not exist");
    }
    let userArr = await this.rolemapRepo.find({ where: { role_id: role_id } });
    return userArr.map(u => u.role_id);
  }

  @get('/rolemap/{user_id}')
  async getRoleIDsByUserID(@param.path.number('user_id') user_id: number): Promise<Array<Number>> {
    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest("User does not exist");
    }
    let roleArr = await this.rolemapRepo.find({ where: { user_id: user_id } });
    return roleArr.map(r => r.role_id);
  }

  @del('/rolemap/{user_id}')
  async removeRolesByUserID(@param.path.number('user_id') user_id: number) {
    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest("Invalid user ID");
    }
    return await this.rolemapRepo.deleteAll({ where: { user_id: user_id } });
  }

  @del('/rolemap/{role_id}')
  async removeUsersByRoleID(@param.path.number('role_id') role_id: number) {
    let roleExists: boolean = !!(await this.roleRepo.count({ id: role_id }));
    if (!roleExists) {
      throw new HttpErrors.BadRequest("Invalid role ID");
    }
    return await this.rolemapRepo.deleteAll({ where: { role_id: role_id } });
  }

  @del('/rolemap')
  async removeRoleMapEntry(@requestBody() rolemap: Rolemap) {
    let userExists: boolean = !!(await this.userRepo.count({ id: rolemap.user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest("Invalid user ID");
    }
    let roleExists: boolean = !!(await this.roleRepo.count({ id: rolemap.project_id }));
    if (!roleExists) {
      throw new HttpErrors.BadRequest("Invalid role ID");
    }
    return await this.rolemapRepo.delete(rolemap);
  }
}
