import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param, del } from "@loopback/rest";
import { KeywordMapRepository } from "../repositories/keywordmap.repository";
import { KeywordRepository } from "../repositories/keyword.repository";
import { ProjectRepository } from "../repositories/project.repository";
import { Keyword } from "../models/keyword";
import { Project } from "../models/projects";
import { KeywordMap } from "../models/keywordmap";


export class KeywordsController {

  constructor(
    @repository(KeywordMapRepository.name) private keymapRepo: KeywordMapRepository,
    @repository(KeywordRepository.name) private keyRepo: KeywordRepository,
    @repository(ProjectRepository.name) private projectRepo: ProjectRepository
  ) { }

  @get('/keyword/{keyword}')
  async getIDbyKeyword(@param.path.string('keyword') keyword: string): Promise<Keyword> {
    let keywordExists = !!(await this.keyRepo.count({ keyword: keyword }))
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Keyword does not exist");
    }
    return await this.keyRepo.findOne({
      where: {
        keyword: keyword
      }
    }
    )
  };

  @get('/keyword')
  async getKeywordByID(@param.query.number('id') id: number): Promise<Keyword> {
    let keywordExists = !!(await this.keyRepo.count({ id: id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Invalid keyword ID");
    }
    return await this.keyRepo.findOne({
      where: {
        id: id
      }
    }
    );
  }

  @post('/keyword')
  async createNewKeyword(
    @requestBody() key: Keyword
  ) {
    let keywordExists: boolean = !!(await this.keyRepo.count({ keyword: key.keyword }));
    if (keywordExists) {
      throw new HttpErrors.BadRequest('Keyword already exist');
    }
    return await this.keyRepo.create(key);
  }

  @post('/keywords')
  async createKeywordMap(@requestBody() keymap: KeywordMap) {
    let keywordExists: boolean = !!(await this.keyRepo.count({ id: keymap.keyword_id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Keyword does not exist");
    }
    let projectExists: boolean = !!(await this.projectRepo.count({ id: keymap.project_id }));
    if (!projectExists) {
      throw new HttpErrors.BadRequest("Project does not exist");
    }
    let newKMap = new KeywordMap;
    newKMap.keyword_id = keymap.keyword_id;
    newKMap.project_id = keymap.project_id;
    return await this.keymapRepo.create(newKMap);
  }

  @get('/keywords')
  async getProjectIDsByKeywordID(@param.query.number('keyword_id') keyword_id: number): Promise<Array<Number>> {
    let keywordExists: boolean = !!(await this.keyRepo.count({ id: keyword_id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Keyword does not exist");
    }
    let projectArr = await this.keymapRepo.find({ where: { keyword_id: keyword_id } });
    return projectArr.map(p => p.project_id);
  }

  @del('/keywords/{project_id}')
  async removeKeywordsByProjectID(@param.path.number('project_id') project_id: number) {
    let projectExists: boolean = !!(await this.projectRepo.count({ id: project_id }));
    if (!projectExists) {
      throw new HttpErrors.BadRequest("Invalid project ID");
    }
    return await this.keymapRepo.deleteAll({ where: { project_id: project_id } });
  }

  @del('/keywords/{keyword_id}')
  async removeProjectsByKeywordID(@param.path.number('keyword_id') keyword_id: number) {
    let keywordExists: boolean = !!(await this.keyRepo.count({ id: keyword_id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Invalid keyword ID");
    }
    return await this.keymapRepo.deleteAll({ where: { keyword_id: keyword_id } });
  }

  @del('/keywordmap')
  async removeKeywordMapEntry(@requestBody() keymap: KeywordMap) {
    let keywordExists: boolean = !!(await this.keymapRepo.count({ keyword_id: keymap.keyword_id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Invalid keyword ID");
    }
    let projectExists: boolean = !!(await this.keymapRepo.count({ project_id: keymap.project_id }));
    if (!projectExists) {
      throw new HttpErrors.BadRequest("Invalid project ID");
    }
    return await this.keymapRepo.delete(keymap);
  }

  @get('/keywords')
  async getAllKeywords(): Promise<Array<Keyword>> {
    return await this.keyRepo.find();
  }
}
