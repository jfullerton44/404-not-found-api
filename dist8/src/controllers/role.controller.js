"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const role_repository_1 = require("../repositories/role.repository");
const roleMap_1 = require("../models/roleMap");
const roleMap_repository_1 = require("../repositories/roleMap.repository");
const user_repository_1 = require("../repositories/user.repository");
const role_1 = require("../models/role");
let RoleController = class RoleController {
    constructor(roleRepo, rolemapRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.rolemapRepo = rolemapRepo;
        this.userRepo = userRepo;
    }
    async getIDbyRole(role) {
        let roleExists = !!(await this.roleRepo.count({ name: role }));
        if (!roleExists) {
            throw new rest_1.HttpErrors.BadRequest("Role does not exist");
        }
        return await this.roleRepo.findOne({
            where: {
                name: role
            }
        });
    }
    ;
    async getRoleByID(id) {
        let roleExists = !!(await this.roleRepo.count({ id: id }));
        if (!roleExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid role ID");
        }
        return await this.roleRepo.findOne({
            where: {
                id: id
            }
        });
    }
    async createNewRole(role) {
        let roleExists = !!(await this.roleRepo.count({ name: role.name }));
        if (roleExists) {
            throw new rest_1.HttpErrors.BadRequest('Role exists');
        }
        return await this.roleRepo.create(role);
    }
    async createRoleMap(rolemap) {
        let roleExists = !!(await this.roleRepo.count({ id: rolemap.role_id }));
        if (!roleExists) {
            throw new rest_1.HttpErrors.BadRequest("Role does not exist");
        }
        let userExists = !!(await this.userRepo.count({ id: rolemap.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest("User does not exist");
        }
        let newRMap = new roleMap_1.Rolemap;
        newRMap.user_id = rolemap.user_id;
        newRMap.role_id = rolemap.role_id;
        return await this.rolemapRepo.create(newRMap);
    }
    async removeUsersByRoleID(role_id) {
        let roleExists = !!(await this.roleRepo.count({ id: role_id }));
        if (!roleExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid role ID");
        }
        return await this.rolemapRepo.deleteAll({ where: { role_id: role_id } });
    }
    async removeRoleMapEntry(rolemap) {
        let userExists = !!(await this.userRepo.count({ id: rolemap.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid user ID");
        }
        let roleExists = !!(await this.roleRepo.count({ id: rolemap.project_id }));
        if (!roleExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid role ID");
        }
        return await this.rolemapRepo.delete(rolemap);
    }
};
__decorate([
    rest_1.get('role/{role}'),
    __param(0, rest_1.param.path.string('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getIDbyRole", null);
__decorate([
    rest_1.get('role/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleByID", null);
__decorate([
    rest_1.post('/role'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_1.Role]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createNewRole", null);
__decorate([
    rest_1.post('/rolemap'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roleMap_1.Rolemap]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRoleMap", null);
__decorate([
    rest_1.del('/rolemap/{role_id}'),
    __param(0, rest_1.param.path.number('role_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "removeUsersByRoleID", null);
__decorate([
    rest_1.del('/rolemap'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roleMap_1.Rolemap]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "removeRoleMapEntry", null);
RoleController = __decorate([
    __param(0, repository_1.repository(role_repository_1.RoleRepository.name)),
    __param(1, repository_1.repository(roleMap_repository_1.RolemapRepository.name)),
    __param(2, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository,
        roleMap_repository_1.RolemapRepository,
        user_repository_1.UserRepository])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map