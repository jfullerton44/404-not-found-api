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
const bank_repository_1 = require("../repositories/bank.repository");
const bankaccount_1 = require("../models/bankaccount");
const bankaccount_repository_1 = require("../repositories/bankaccount.repository");
const bank_1 = require("../models/bank");
const charity_repository_1 = require("../repositories/charity.repository");
const address_repository_1 = require("../repositories/address.repository");
let BankController = class BankController {
    constructor(bankRepo, bankaccRepo, charityRepo, addressRepo) {
        this.bankRepo = bankRepo;
        this.bankaccRepo = bankaccRepo;
        this.charityRepo = charityRepo;
        this.addressRepo = addressRepo;
    }
    async createNewBank(bank) {
        let bankExists = !!(await this.bankRepo.count({ id: bank.id }));
        if (bankExists) {
            throw new rest_1.HttpErrors.BadRequest('Bank already exists');
        }
        return await this.bankRepo.create(bank);
    }
    async createNewBankAccount(bankAcc) {
        let bankaccExists = !!(await this.bankaccRepo.count({ id: bankAcc.id }));
        if (bankaccExists) {
            throw new rest_1.HttpErrors.BadRequest('Bank account already exists');
        }
        return await this.bankRepo.create(bankAcc);
    }
    async getBankByID(id) {
        let bankExists = !!(await this.bankRepo.count({ id: id }));
        if (!bankExists) {
            throw new rest_1.HttpErrors.BadRequest(`Invalid bank ID`);
        }
        return await this.bankRepo.findById(id);
    }
    async getAllBanks() {
        return await this.bankRepo.find();
    }
    async getBankAccountsbyBankID(bank_id) {
        let charityExists = !!(await this.bankRepo.count({ id: bank_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Bank does not exist");
        }
        return await this.bankaccRepo.find({ where: { bank_id: bank_id } });
    }
    async getBankAccountsByAccountNum(accNum) {
        let accountExists = !!(await this.bankaccRepo.count({ accountNum: accNum }));
        if (!accountExists) {
            throw new rest_1.HttpErrors.BadRequest("Account does not exist");
        }
        return await this.bankaccRepo.find({ where: { accountNum: accNum } });
    }
    async removeBankAccountbyCharityID(charity_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        return await this.bankaccRepo.deleteAll({ where: { charity_id: charity_id } });
    }
    async removeBanksbyBankID(bank_id) {
        let bankExists = !!(await this.bankRepo.count({ id: bank_id }));
        if (!bankExists) {
            throw new rest_1.HttpErrors.BadRequest("Bank does not exist");
        }
        return await this.bankaccRepo.deleteAll({ where: { bank_id: bank_id } });
    }
    async removeBankAccount(bankacc) {
        let bankExists = !!(await this.bankaccRepo.count({ bank_id: bankacc.bank_id }));
        if (!bankExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid bank ID");
        }
        let charityExists = !!(await this.bankaccRepo.count({ charity_id: bankacc.charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid charity ID");
        }
        return await this.bankaccRepo.delete(bankacc);
    }
    async getAddressforBankID(bank_id) {
        let bankExists = !!(await this.bankRepo.count({ id: bank_id }));
        if (!bankExists) {
            throw new rest_1.HttpErrors.BadRequest('Invalid bank ID');
        }
        let addressExists = !!(await this.addressRepo.count({ bank_id: bank_id }));
        if (!addressExists) {
            throw new rest_1.HttpErrors.BadRequest('No address registered for Bank ID');
        }
        return this.addressRepo.findOne({ where: { bank_id: bank_id } });
    }
};
__decorate([
    rest_1.post('/bank'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bank_1.Bank]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "createNewBank", null);
__decorate([
    rest_1.post('/bankaccount'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankaccount_1.BankAccount]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "createNewBankAccount", null);
__decorate([
    rest_1.get('/bank'),
    __param(0, rest_1.param.query.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getBankByID", null);
__decorate([
    rest_1.get('/banks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getAllBanks", null);
__decorate([
    rest_1.get('/banks/{bank_id}/accounts'),
    __param(0, rest_1.param.path.number('bank_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getBankAccountsbyBankID", null);
__decorate([
    rest_1.get('/bankaccounts'),
    __param(0, rest_1.param.query.number('accNum')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getBankAccountsByAccountNum", null);
__decorate([
    rest_1.del('/bankaccounts'),
    __param(0, rest_1.param.query.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "removeBankAccountbyCharityID", null);
__decorate([
    rest_1.del('/bank'),
    __param(0, rest_1.param.query.number('bank_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "removeBanksbyBankID", null);
__decorate([
    rest_1.del('/bankaccounts'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankaccount_1.BankAccount]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "removeBankAccount", null);
__decorate([
    rest_1.get('/banks/{bank_id}/address'),
    __param(0, rest_1.param.path.number('bank_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getAddressforBankID", null);
BankController = __decorate([
    __param(0, repository_1.repository(bank_repository_1.BankRepository.name)),
    __param(1, repository_1.repository(bankaccount_repository_1.BankAccountRepository.name)),
    __param(2, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __param(3, repository_1.repository(address_repository_1.AddressRepository.name)),
    __metadata("design:paramtypes", [bank_repository_1.BankRepository,
        bankaccount_repository_1.BankAccountRepository,
        charity_repository_1.CharityRepository,
        address_repository_1.AddressRepository])
], BankController);
exports.BankController = BankController;
//# sourceMappingURL=bank.controller.js.map