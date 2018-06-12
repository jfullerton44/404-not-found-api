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
const charity_repository_1 = require("../repositories/charity.repository");
const charity_1 = require("../models/charity");
let CharityController = class CharityController {
    constructor(charityRepo) {
        this.charityRepo = charityRepo;
    }
    async createCharity(charity) {
        let charityExists = !!(await this.charityRepo.count({ name: charity.name }));
        if (charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity with this name already Exists");
        }
        return await this.charityRepo.create(charity);
    }
    async getAllCharities() {
        return await this.charityRepo.find();
    }
    async getCharityByID(id) {
        let charityExists = !!(await this.charityRepo.count({ id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest(`charity ID ${id} does not exist`);
        }
        return await this.charityRepo.findById(id);
    }
    async deleteCharityByID(id) {
        let charityExists = !!(await this.charityRepo.count({ id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest(`charity ID ${id} does not exist`);
        }
        return await this.charityRepo.deleteById(id);
    }
    async updateCharity(id, charity) {
        id = +id;
        return await this.charityRepo.updateById(id, charity);
    }
    async replaceCharity(id, charity) {
        id = +id;
        return await this.charityRepo.replaceById(id, charity);
    }
};
__decorate([
    rest_1.post('/charityReg'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charity_1.Charity]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "createCharity", null);
__decorate([
    rest_1.get('/charities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getAllCharities", null);
__decorate([
    rest_1.get('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getCharityByID", null);
__decorate([
    rest_1.del('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "deleteCharityByID", null);
__decorate([
    rest_1.patch('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, charity_1.Charity]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "updateCharity", null);
__decorate([
    rest_1.put('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, charity_1.Charity]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "replaceCharity", null);
CharityController = __decorate([
    __param(0, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __metadata("design:paramtypes", [charity_repository_1.CharityRepository])
], CharityController);
exports.CharityController = CharityController;
//# sourceMappingURL=charity.controller.js.map