import { RoleRepository } from "../repositories/role.repository";
import { Rolemap } from "../models/roleMap";
import { RolemapRepository } from "../repositories/roleMap.repository";
import { UserRepository } from "../repositories/user.repository";
import { Role } from "../models/role";
export declare class RoleController {
    private roleRepo;
    private rolemapRepo;
    private userRepo;
    constructor(roleRepo: RoleRepository, rolemapRepo: RolemapRepository, userRepo: UserRepository);
    getIDbyRole(role: string): Promise<Role>;
    getRoleByID(id: number): Promise<Role>;
    createNewRole(role: Role): Promise<Role>;
    createRoleMap(rolemap: Rolemap): Promise<Rolemap>;
    removeUsersByRoleID(role_id: number): Promise<number>;
    removeRoleMapEntry(rolemap: Rolemap): Promise<boolean>;
}
