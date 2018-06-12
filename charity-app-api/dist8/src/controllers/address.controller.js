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
const address_repository_1 = require("../repositories/address.repository");
const user_repository_1 = require("../repositories/user.repository");
const rest_1 = require("@loopback/rest");
const address_1 = require("../models/address");
let AddressController = class AddressController {
    constructor(addressRepo, userRepo) {
        this.addressRepo = addressRepo;
        this.userRepo = userRepo;
    }
    async newAddress(address) {
        let userExists = !!(await this.userRepo.count({ id: address.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('User Does not exist');
        }
        return await this.addressRepo.create(address);
    }
    async getUserByID(id) {
        let addressExists = !!(await this.addressRepo.count({ id }));
        if (!addressExists) {
            throw new rest_1.HttpErrors.BadRequest(`address ID ${id} does not exist`);
        }
        return await this.addressRepo.findById(id);
    }
    async getAllAddresses() {
        return await this.addressRepo.find();
    }
};
__decorate([
    rest_1.post('/address'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_1.Address]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "newAddress", null);
__decorate([
    rest_1.get('/addresses/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getUserByID", null);
__decorate([
    rest_1.get('/addressses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "getAllAddresses", null);
AddressController = __decorate([
    __param(0, repository_1.repository(address_repository_1.AddressRepository.name)),
    __param(1, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [address_repository_1.AddressRepository,
        user_repository_1.UserRepository])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map