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
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let RegistrationController = class RegistrationController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createUser(user) {
        let hashedPassword = await bcrypt.hash(user.password, 10);
        //var userToStore = new User();
        user.password = hashedPassword;
        let userExists = !!(await this.userRepo.count({ email: user.email }));
        if (userExists) {
            throw new rest_1.HttpErrors.BadRequest("Email already Exists");
        }
        let usernameTaken = !!(await this.userRepo.count({ username: user.username }));
        if (usernameTaken) {
            throw new rest_1.HttpErrors.BadRequest("Username Taken");
        }
        let storedUser = await this.userRepo.create(user);
        storedUser.password = "";
        var jwt = jsonwebtoken_1.sign({
            user: user
        }, 'shh', {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
        });
        return {
            token: jwt,
        };
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
};
__decorate([
    rest_1.post('/reg/users'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "createUser", null);
__decorate([
    rest_1.get('/reg/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "getAllUsers", null);
RegistrationController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], RegistrationController);
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map