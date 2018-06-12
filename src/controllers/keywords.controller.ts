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

  @get('keyword/{keyword}')
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

  @get('keyword/{id}')
  async getKeywordByID(@param.path.number('id') id: number): Promise<Keyword> {
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

  @post('/keywordmap')
  async createKeywordMap(@requestBody() keyword: Keyword, project: Project) {
    let keywordExists: boolean = !!(await this.keyRepo.count({ keyword_id: keyword.id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Keyword does not exist");
    }
    let projectExists: boolean = !!(await this.projectRepo.count({ project_id: project.id }));
    if (!projectExists) {
      throw new HttpErrors.BadRequest("Project does not exist");
    }
    let newKMap = new KeywordMap;
    newKMap.keyword_id = keyword.id;
    newKMap.project_id = project.id;
    return await this.keymapRepo.create(newKMap);
  }

  @get('/keywordmap/{project_id}')
  async getKeywordIDsByProjectID(@param.path.number('project_id') project_id: number): Promise<Array<Number>> {
    let projectExists: boolean = !!(await this.keymapRepo.count({ project_id: project_id }));
    if (!projectExists) {
      throw new HttpErrors.BadRequest("Project does not exist");
    }
    let keywordArr = await this.keymapRepo.find({ where: { project_id: project_id } });
    return keywordArr.map(k => k.keyword_id);
  }

  @get('/keywordmap/{keyword_id}')
  async getProjectsByKeywordID(@param.path.number('keyword_id') keyword_id: number): Promise<Array<Number>> {
    let keywordExists: boolean = !!(await this.keymapRepo.count({ keyword_id: keyword_id }));
    if (!keywordExists) {
      throw new HttpErrors.BadRequest("Keyword does not exist");
    }
    let projectArr = await this.keymapRepo.find({ where: { keyword_id: keyword_id } });
    return projectArr.map(p => p.project_id);
  }

  @del('/keywordmap/{project_id}')
  async removeKeywordsByProjectID(@param.path.number('project_id') project_id: number) {
    let projectExists: boolean = !!(await this.keymapRepo.count({ project_id: project_id }));
    if (!projectExists) {
      throw new HttpErrors.BadRequest("Invalid project ID");
    }
    return await this.keymapRepo.deleteAll({ where: { project_id: project_id } });
  }

  @del('/keywordmap/{keyword_id}')
  async removeProjectsByKeywordID(@param.path.number('keyword_id') keyword_id: number) {
    let keywordExists: boolean = !!(await this.keymapRepo.count({ keyword_id: keyword_id }));
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
