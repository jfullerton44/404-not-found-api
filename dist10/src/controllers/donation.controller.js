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
const payment_method_repository_1 = require("../repositories/payment_method.repository");
let DonationController = class DonationController {
    constructor(donationRepo, userRepo, charityRepo, paymentRepo) {
        this.donationRepo = donationRepo;
        this.userRepo = userRepo;
        this.charityRepo = charityRepo;
        this.paymentRepo = paymentRepo;
    }
    /*
      @post('/donations2/{user_id}/{charity_id}')
      async createDonation(
        @param.path.number('user_id') user_id: number,
        @param.path.number('charity_id') charity_id: number,
        @param.query.number('donation_amount') donation_amount: number,
        @param.query.date('date') date: Date
      ) {
        var donation = new Donation;
  
        let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
  
        if (!userExists) {
          throw new HttpErrors.Unauthorized('User Does not exist');
        }
        // if (userExists) {
        //   console.log('user exists')
        // }
  
        donation.user_id = user_id;
  
        let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));
  
        if (!charityExists) {
          throw new HttpErrors.Unauthorized('Charity Does not exist');
        }
  
        donation.charity_id = charity_id;
        console.log(donation_amount);
        donation.amount_donated = donation_amount;
  
        return await this.donationRepo.create(donation);
      }
    */
    async newDonation(donation) {
        let userExists = !!(await this.userRepo.count({ id: donation.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('User Does not exist');
        }
        let charityExists = !!(await this.charityRepo.count({ id: donation.charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.Unauthorized('Charity Does not exist');
        }
        let paymentExists = !!(await this.paymentRepo).count({ id: donation.pm_id });
        if (!paymentExists) {
            throw new rest_1.HttpErrors.Unauthorized('Payment does not exist');
        }
        console.log("Donation");
        var payment = await this.paymentRepo.findById(donation.pm_id);
        console.log("Don");
        var stripe = require("stripe")("sk_test_3P0s9sObeFYsv3djqj0ec7kJ");
        var charge = await stripe.charges.create({
            amount: donation.amount_donated,
            currency: "usd",
            source: payment.cardSource,
            description: "$" + donation.amount_donated + " charged"
        });
        return await this.donationRepo.create(donation);
    }
    async getAllDonations() {
        return await this.donationRepo.find();
    }
    async getDonationsbyCharityID(charity_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        return this.donationRepo.find({ where: { charity_id: charity_id } });
    }
    async getDonationsbyUserID(user_id) {
        let userExists = !!(await this.userRepo.count({ id: user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest("User does not exist");
        }
        return this.donationRepo.find({ where: { user_id: user_id } });
    }
};
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
__decorate([
    rest_1.get('/donations'),
    __param(0, rest_1.param.query.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonationsbyCharityID", null);
__decorate([
    rest_1.get('/donationsId'),
    __param(0, rest_1.param.query.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationController.prototype, "getDonationsbyUserID", null);
DonationController = __decorate([
    __param(0, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __param(1, repository_1.repository(user_repository_1.UserRepository.name)),
    __param(2, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __param(3, repository_1.repository(payment_method_repository_1.Payment_MethodRepository)),
    __metadata("design:paramtypes", [donation_repository_1.DonationRepository,
        user_repository_1.UserRepository,
        charity_repository_1.CharityRepository,
        payment_method_repository_1.Payment_MethodRepository])
], DonationController);
exports.DonationController = DonationController;
//# sourceMappingURL=donation.controller.js.map