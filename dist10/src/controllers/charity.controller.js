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
const address_repository_1 = require("../repositories/address.repository");
const bankaccount_repository_1 = require("../repositories/bankaccount.repository");
const project_repository_1 = require("../repositories/project.repository");
const post_repository_1 = require("../repositories/post.repository");
const keywordmap_repository_1 = require("../repositories/keywordmap.repository");
const donation_repository_1 = require("../repositories/donation.repository");
let CharityController = class CharityController {
    constructor(charityRepo, addressRepo, bankaccRepo, projectRepo, postRepo, keymapRepo, donationRepo) {
        this.charityRepo = charityRepo;
        this.addressRepo = addressRepo;
        this.bankaccRepo = bankaccRepo;
        this.projectRepo = projectRepo;
        this.postRepo = postRepo;
        this.keymapRepo = keymapRepo;
        this.donationRepo = donationRepo;
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
    async getAddressforCharityID(charity_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest('Invalid charity ID');
        }
        let addressExists = !!(await this.addressRepo.count({ chartiy_id: charity_id }));
        if (!addressExists) {
            throw new rest_1.HttpErrors.BadRequest('No address registered for Charity ID');
        }
        return this.addressRepo.findOne({ where: { charity_id: charity_id } });
    }
    async getBankAccountsForCharityID(charity_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        return await this.bankaccRepo.find({ where: { charity_id: charity_id } });
    }
    async getProjectsForCharityID(charity_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        return await this.projectRepo.find({ where: { charity_id: charity_id } });
    }
    async getDonationsForCharityID(charity_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        return await this.donationRepo.find({ where: { charity_id: charity_id } });
    }
    async getProjectbyID(charity_id, project_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        let projectExists = !!(await this.projectRepo.count({ project_id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest(`Invalid project ID`);
        }
        return await this.projectRepo.findById(project_id);
    }
    async getPostsForProjectID(charity_id, project_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        let projectExists = !!(await this.projectRepo.count({ id: project_id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        return await this.postRepo.find({ where: { project_id: project_id } });
    }
    async getKeywordIDsForProjectID(charity_id, project_id) {
        let charityExists = !!(await this.charityRepo.count({ id: charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        let projectExists = !!(await this.projectRepo.count({ id: project_id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest("Charity does not exist");
        }
        let keyArr = await this.keymapRepo.find({ where: { project_id: project_id } });
        return keyArr.map(k => k.keyword_id);
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
__decorate([
    rest_1.get('/charities/{charity_id}/address'),
    __param(0, rest_1.param.path.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getAddressforCharityID", null);
__decorate([
    rest_1.get('/charities/{charity_id}/bankaccounts'),
    __param(0, rest_1.param.query.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getBankAccountsForCharityID", null);
__decorate([
    rest_1.get('/charities/{charity_id}/projects'),
    __param(0, rest_1.param.path.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getProjectsForCharityID", null);
__decorate([
    rest_1.get('/charities/{charity_id}/donations'),
    __param(0, rest_1.param.path.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getDonationsForCharityID", null);
__decorate([
    rest_1.get('/charities/{charity_id}/projects/{project_id}'),
    __param(0, rest_1.param.path.number('charity_id')),
    __param(1, rest_1.param.path.number('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getProjectbyID", null);
__decorate([
    rest_1.get('/charities/{charity_id}/projects/{project_id}/posts'),
    __param(0, rest_1.param.path.number('charity_id')),
    __param(1, rest_1.param.path.number('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getPostsForProjectID", null);
__decorate([
    rest_1.get('charities/{charity_id}/projects/{project_id}/keywords'),
    __param(0, rest_1.param.path.number('charity_id')),
    __param(1, rest_1.param.path.number('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getKeywordIDsForProjectID", null);
CharityController = __decorate([
    __param(0, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __param(1, repository_1.repository(address_repository_1.AddressRepository.name)),
    __param(2, repository_1.repository(bankaccount_repository_1.BankAccountRepository.name)),
    __param(3, repository_1.repository(project_repository_1.ProjectRepository.name)),
    __param(4, repository_1.repository(post_repository_1.PostRepository.name)),
    __param(5, repository_1.repository(keywordmap_repository_1.KeywordMapRepository.name)),
    __param(6, repository_1.repository(donation_repository_1.DonationRepository)),
    __metadata("design:paramtypes", [charity_repository_1.CharityRepository,
        address_repository_1.AddressRepository,
        bankaccount_repository_1.BankAccountRepository,
        project_repository_1.ProjectRepository,
        post_repository_1.PostRepository,
        keywordmap_repository_1.KeywordMapRepository,
        donation_repository_1.DonationRepository])
], CharityController);
exports.CharityController = CharityController;
//# sourceMappingURL=charity.controller.js.map