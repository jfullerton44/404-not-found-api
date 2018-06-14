import { repository } from "@loopback/repository";
import { ProjectRepository } from "../repositories/project.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Project } from "../models/projects";
import { CharityRepository } from "../repositories/charity.repository";


export class ProjectController {
  constructor(
    @repository(ProjectRepository.name) private projectRepo: ProjectRepository,
    @repository(CharityRepository.name) private charityRepo: CharityRepository
  ) { }


  @post('/projects')
  async createProject(@requestBody() project: Project) {
    let charityExists: boolean = !!(await this.charityRepo.count({ id: project.charity_id }));
    if (!charityExists) {
      throw new HttpErrors.Unauthorized('Charity Does not exist');
    }
    return await this.projectRepo.create(project);
  }

  @get('/projects/all')
  async getAllprojects(): Promise<Array<Project>> {
    return await this.projectRepo.find();
  }
}
