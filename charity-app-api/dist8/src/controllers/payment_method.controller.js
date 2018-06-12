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
const payment_method_repository_1 = require("../repositories/payment_method.repository");
const payment_method_1 = require("../models/payment_method");
const user_repository_1 = require("../repositories/user.repository");
let Payment_MethodController = class Payment_MethodController {
    constructor(payment_methodRepo, userRepo) {
        this.payment_methodRepo = payment_methodRepo;
        this.userRepo = userRepo;
    }
    async createPayment_Method(payment_method) {
        let userExists = !!(await this.userRepo.count({ id: payment_method.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('User Does not exist');
        }
        return await this.payment_methodRepo.create(payment_method);
    }
    async getUserByID(id) {
        let payment_methodExists = !!(await this.payment_methodRepo.count({ id }));
        if (!payment_methodExists) {
            throw new rest_1.HttpErrors.BadRequest(`payment method ID ${id} does not exist`);
        }
        return await this.payment_methodRepo.findById(id);
    }
    async getAllPayment_Methods() {
        return await this.payment_methodRepo.find();
    }
};
__decorate([
    rest_1.post('/payment_method'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_method_1.Payment_Method]),
    __metadata("design:returntype", Promise)
], Payment_MethodController.prototype, "createPayment_Method", null);
__decorate([
    rest_1.get('/payment_methods/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Payment_MethodController.prototype, "getUserByID", null);
__decorate([
    rest_1.get('/payment_methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Payment_MethodController.prototype, "getAllPayment_Methods", null);
Payment_MethodController = __decorate([
    __param(0, repository_1.repository(payment_method_repository_1.Payment_MethodRepository.name)),
    __param(1, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [payment_method_repository_1.Payment_MethodRepository,
        user_repository_1.UserRepository])
], Payment_MethodController);
exports.Payment_MethodController = Payment_MethodController;
//# sourceMappingURL=payment_method.controller.js.map