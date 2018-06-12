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
const donation_repository_1 = require("../repositories/donation.repository");
const user_repository_1 = require("../repositories/user.repository");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const donation_1 = require("../models/donation");
const charity_repository_1 = require("../repositories/charity.repository");
let DonationController = class DonationController {
    constructor(donationRepo, userRepo, charityRepo) {
        this.donationRepo = donationRepo;
        this.userRepo = userRepo;
        this.charityRepo = charityRepo;
    }
    async createDonation(user_id, charity_id, donation_amount, date) {
        var donation = new donation_1.Donation;
        let userExists = !!(await this.userRepo.count({ id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('User Does not exist');
        }
        if (userExists) {
            console.log('user exists');
        }
        donation.user_id = user_id;
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.Unauthorized('Charity Does not exist');
        }
        donation.charity_id = charity_id;
        donation.amount_donated = donation_amount;
        return await this.donationRepo.create(donation);
    }
    async newDonation(donation) {
        let userExists = !!(await this.userRepo.count({ id: donation.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('User Does not exist');
        }
        let charityExists = !!(await this.charityRepo.count({ id: donation.charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.Unauthorized('Charity Does not exist');
        }
        return await this.donationRepo.create(donation);
    }
    async getAllDonations() {
        return await this.donationRepo.find();
    }
};
__decorate([
    rest_1.post('/donations/{user_id}/{charity_id}'),
    __param(0, rest_1.param.path.number('user_id')),
    __param(1, rest_1.param.path.number('charity_id')),
    __param(2, rest_1.param.query.number('donation_amount')),
    __param(3, rest_1.param.query.date('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Date]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "createDonation", null);
__decorate([
    rest_1.post('/donations'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donation_1.Donation]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "newDonation", null);
__decorate([
    rest_1.get('/donations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getAllDonations", null);
DonationController = __decorate([
    __param(0, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __param(1, repository_1.repository(user_repository_1.UserRepository.name)),
    __param(2, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __metadata("design:paramtypes", [donation_repository_1.DonationRepository,
        user_repository_1.UserRepository,
        charity_repository_1.CharityRepository])
], DonationController);
exports.DonationController = DonationController;
//# sourceMappingURL=donation.controller.js.map