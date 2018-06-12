import { ProjectRepository } from "../repositories/project.repository";
import { Project } from "../models/projects";
import { CharityRepository } from "../repositories/charity.repository";
export declare class ProjectController {
    private projectRepo;
    private charityRepo;
    constructor(projectRepo: ProjectRepository, charityRepo: CharityRepository);
    createProject(project: Project): Promise<Project>;
    getUserByID(id: number): Promise<Project>;
    getAllprojects(): Promise<Array<Project>>;
}
