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
const user_repository_1 = require("../repositories/user.repository");
const rest_1 = require("@loopback/rest");
const user_1 = require("../models/user");
const payment_method_repository_1 = require("../repositories/payment_method.repository");
const donation_repository_1 = require("../repositories/donation.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const address_repository_1 = require("../repositories/address.repository");
const roleMap_repository_1 = require("../repositories/roleMap.repository");
let UserController = class UserController {
    constructor(userRepo, payment_methodRepo, donationRepo, addressRepo, rolemapRepo) {
        this.userRepo = userRepo;
        this.payment_methodRepo = payment_methodRepo;
        this.donationRepo = donationRepo;
        this.addressRepo = addressRepo;
        this.rolemapRepo = rolemapRepo;
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
    async getUserByKey(jwt) {
        if (!jwt) {
            throw new rest_1.HttpErrors.Unauthorized(`Need a jwt`);
        }
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            return jwtBody;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT invalid');
        }
    }
    async deleteUser(id) {
        let userExists = !!(await this.userRepo.count({ id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }
        return await this.userRepo.deleteById(id);
    }
    async updateUser(id, user) {
        id = +id;
        return await this.userRepo.updateById(id, user);
    }
    async replaceUser(id, user) {
        id = +id;
        return await this.userRepo.replaceById(id, user);
    }
    async getDonationsByUserId(user_id) {
        let userExists = !!(await this.donationRepo.count({ user_id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${user_id} does not have a donation`);
        }
        return await this.donationRepo.find({ where: { user_id: user_id } });
    }
    async getPayment_MethodsByUserId(user_id) {
        let userExists = !!(await this.payment_methodRepo.count({ user_id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${user_id} does not have a payment method`);
        }
        return await this.payment_methodRepo.find({ where: { user_id: user_id } });
    }
    async getUserIdByEmail(email) {
        let userExists = !!(await this.userRepo.count({ email: email }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`email ${email} does not exist`);
        }
        let returnUser = await this.userRepo.findOne({ where: { email: email } });
        return returnUser.id;
    }
    async getUserIdByUsername(username) {
        let userExists = !!(await this.userRepo.count({ username: username }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`username ${username} does not exist`);
        }
        let returnUser = await this.userRepo.findOne({ where: { username: username } });
        return returnUser.id;
    }
    async getAddressforUserID(user_id) {
        let userExists = !!(await this.userRepo.count({ id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest('Invalid user ID');
        }
        let addressExists = !!(await this.addressRepo.count({ user_id: user_id }));
        if (!addressExists) {
            throw new rest_1.HttpErrors.BadRequest('No address registered for User ID');
        }
        return this.addressRepo.findOne({ where: { user_id: user_id } });
    }
    async getRoleIDsforUserID(user_id) {
        let userExists = !!(await this.userRepo.count({ id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest('Invalid user ID');
        }
        let rMapArr = await this.rolemapRepo.find({ where: { user_id: user_id } });
        return rMapArr.map(r => r.role_id);
    }
    async removeRolesByUserID(user_id) {
        let userExists = !!(await this.userRepo.count({ id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid user ID");
        }
        return await this.rolemapRepo.deleteAll({ where: { user_id: user_id } });
    }
};
__decorate([
    rest_1.get('/users/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    rest_1.get('/users'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByKey", null);
__decorate([
    rest_1.del('/users/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    rest_1.patch('/users/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    rest_1.put('/users/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "replaceUser", null);
__decorate([
    rest_1.get('users/{user_id}/donations'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDonationsByUserId", null);
__decorate([
    rest_1.get('/users/{user_id}/payment_methods'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPayment_MethodsByUserId", null);
__decorate([
    rest_1.get('user/email/{email}'),
    __param(0, rest_1.param.path.string('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserIdByEmail", null);
__decorate([
    rest_1.get('userId/username/{username}'),
    __param(0, rest_1.param.path.string('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserIdByUsername", null);
__decorate([
    rest_1.get('/users/{user_id}/address'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAddressforUserID", null);
__decorate([
    rest_1.get('/users/{user_id}/roles'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRoleIDsforUserID", null);
__decorate([
    rest_1.del('/users/{user_id}/roles'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeRolesByUserID", null);
UserController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __param(1, repository_1.repository(payment_method_repository_1.Payment_MethodRepository.name)),
    __param(2, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __param(3, repository_1.repository(address_repository_1.AddressRepository.name)),
    __param(4, repository_1.repository(roleMap_repository_1.RolemapRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        payment_method_repository_1.Payment_MethodRepository,
        donation_repository_1.DonationRepository,
        address_repository_1.AddressRepository,
        roleMap_repository_1.RolemapRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map