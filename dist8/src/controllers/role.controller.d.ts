import { RoleRepository } from "../repositories/role.repository";
import { Rolemap } from "../models/roleMap";
import { RolemapRepository } from "../repositories/roleMap.repository";
import { UserRepository } from "../repositories/user.repository";
import { Role } from "../models/role";
import { User } from "../models/user";
export declare class RoleController {
    private roleRepo;
    private rolemapRepo;
    private userRepo;
    constructor(roleRepo: RoleRepository, rolemapRepo: RolemapRepository, userRepo: UserRepository);
    getIDbyRole(role: string): Promise<Role>;
    getRoleByID(id: number): Promise<Role>;
    createNewRole(role: Role): Promise<Role>;
    createRoleMap(role: Role, user: User): Promise<Rolemap>;
    getUserIDsByRoleID(role_id: number): Promise<Array<Number>>;
    getRoleIDsByUserID(user_id: number): Promise<Array<Number>>;
    removeRolesByUserID(user_id: number): Promise<number>;
    removeUsersByRoleID(role_id: number): Promise<number>;
    removeRoleMapEntry(rolemap: Rolemap): Promise<boolean>;
}
