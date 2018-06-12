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
const project_repository_1 = require("../repositories/project.repository");
const rest_1 = require("@loopback/rest");
const projects_1 = require("../models/projects");
const charity_repository_1 = require("../repositories/charity.repository");
let ProjectController = class ProjectController {
    constructor(projectRepo, charityRepo) {
        this.projectRepo = projectRepo;
        this.charityRepo = charityRepo;
    }
    async createProject(project) {
        let charityExists = !!(await this.charityRepo.count({ id: project.charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.Unauthorized('Charity Does not exist');
        }
        return await this.projectRepo.create(project);
    }
    async getUserByID(id) {
        let projectExists = !!(await this.projectRepo.count({ id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest(`project ID ${id} does not exist`);
        }
        return await this.projectRepo.findById(id);
    }
    async getAllprojects() {
        return await this.projectRepo.find();
    }
};
__decorate([
    rest_1.post('/projects'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    rest_1.get('/projects/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getUserByID", null);
__decorate([
    rest_1.get('/projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllprojects", null);
ProjectController = __decorate([
    __param(0, repository_1.repository(project_repository_1.ProjectRepository.name)),
    __param(1, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository,
        charity_repository_1.CharityRepository])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map