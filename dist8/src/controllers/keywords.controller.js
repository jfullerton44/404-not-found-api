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
const keywordmap_repository_1 = require("../repositories/keywordmap.repository");
const keyword_repository_1 = require("../repositories/keyword.repository");
const project_repository_1 = require("../repositories/project.repository");
const keyword_1 = require("../models/keyword");
const keywordmap_1 = require("../models/keywordmap");
let KeywordsController = class KeywordsController {
    constructor(keymapRepo, keyRepo, projectRepo) {
        this.keymapRepo = keymapRepo;
        this.keyRepo = keyRepo;
        this.projectRepo = projectRepo;
    }
    async getIDbyKeyword(keyword) {
        let keywordExists = !!(await this.keyRepo.count({ keyword: keyword }));
        if (!keywordExists) {
            throw new rest_1.HttpErrors.BadRequest("Keyword does not exist");
        }
        return await this.keyRepo.findOne({
            where: {
                keyword: keyword
            }
        });
    }
    ;
    async getKeywordByID(id) {
        let keywordExists = !!(await this.keyRepo.count({ id: id }));
        if (!keywordExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid keyword ID");
        }
        return await this.keyRepo.findOne({
            where: {
                id: id
            }
        });
    }
    async createNewKeyword(key) {
        let keywordExists = !!(await this.keyRepo.count({ keyword: key.keyword }));
        if (keywordExists) {
            throw new rest_1.HttpErrors.BadRequest('Keyword already exist');
        }
        return await this.keyRepo.create(key);
    }
    async createKeywordMap(keymap) {
        let keywordExists = !!(await this.keyRepo.count({ id: keymap.keyword_id }));
        if (!keywordExists) {
            throw new rest_1.HttpErrors.BadRequest("Keyword does not exist");
        }
        let projectExists = !!(await this.projectRepo.count({ id: keymap.project_id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest("Project does not exist");
        }
        let newKMap = new keywordmap_1.KeywordMap;
        newKMap.keyword_id = keymap.keyword_id;
        newKMap.project_id = keymap.project_id;
        return await this.keymapRepo.create(newKMap);
    }
    async getProjectIDsByKeywordID(keyword_id) {
        let keywordExists = !!(await this.keyRepo.count({ id: keyword_id }));
        if (!keywordExists) {
            throw new rest_1.HttpErrors.BadRequest("Keyword does not exist");
        }
        let projectArr = await this.keymapRepo.find({ where: { keyword_id: keyword_id } });
        return projectArr.map(p => p.project_id);
    }
    async removeKeywordsByProjectID(project_id) {
        let projectExists = !!(await this.projectRepo.count({ id: project_id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid project ID");
        }
        return await this.keymapRepo.deleteAll({ where: { project_id: project_id } });
    }
    async removeProjectsByKeywordID(keyword_id) {
        let keywordExists = !!(await this.keyRepo.count({ id: keyword_id }));
        if (!keywordExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid keyword ID");
        }
        return await this.keymapRepo.deleteAll({ where: { keyword_id: keyword_id } });
    }
    async removeKeywordMapEntry(keymap) {
        let keywordExists = !!(await this.keymapRepo.count({ keyword_id: keymap.keyword_id }));
        if (!keywordExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid keyword ID");
        }
        let projectExists = !!(await this.keymapRepo.count({ project_id: keymap.project_id }));
        if (!projectExists) {
            throw new rest_1.HttpErrors.BadRequest("Invalid project ID");
        }
        return await this.keymapRepo.delete(keymap);
    }
    async getAllKeywords() {
        return await this.keyRepo.find();
    }
};
__decorate([
    rest_1.get('/keyword/{keyword}'),
    __param(0, rest_1.param.path.string('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "getIDbyKeyword", null);
__decorate([
    rest_1.get('/keyword'),
    __param(0, rest_1.param.query.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "getKeywordByID", null);
__decorate([
    rest_1.post('/keyword'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [keyword_1.Keyword]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "createNewKeyword", null);
__decorate([
    rest_1.post('/keywords'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [keywordmap_1.KeywordMap]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "createKeywordMap", null);
__decorate([
    rest_1.get('/keywords'),
    __param(0, rest_1.param.query.number('keyword_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "getProjectIDsByKeywordID", null);
__decorate([
    rest_1.del('/keywords/{project_id}'),
    __param(0, rest_1.param.path.number('project_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "removeKeywordsByProjectID", null);
__decorate([
    rest_1.del('/keywords/{keyword_id}'),
    __param(0, rest_1.param.path.number('keyword_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "removeProjectsByKeywordID", null);
__decorate([
    rest_1.del('/keywordmap'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [keywordmap_1.KeywordMap]),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "removeKeywordMapEntry", null);
__decorate([
    rest_1.get('/keywords'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KeywordsController.prototype, "getAllKeywords", null);
KeywordsController = __decorate([
    __param(0, repository_1.repository(keywordmap_repository_1.KeywordMapRepository.name)),
    __param(1, repository_1.repository(keyword_repository_1.KeywordRepository.name)),
    __param(2, repository_1.repository(project_repository_1.ProjectRepository.name)),
    __metadata("design:paramtypes", [keywordmap_repository_1.KeywordMapRepository,
        keyword_repository_1.KeywordRepository,
        project_repository_1.ProjectRepository])
], KeywordsController);
exports.KeywordsController = KeywordsController;
//# sourceMappingURL=keywords.controller.js.map