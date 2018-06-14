import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Post } from "../models/posts";
import { PostRepository } from "../repositories/post.repository";
import { repository } from "@loopback/repository";
import { ProjectRepository } from "../repositories/project.repository";


export class PostController {
  constructor(
    @repository(PostRepository.name) private postRepo: PostRepository,
    @repository(ProjectRepository.name) private projectRepo: ProjectRepository
  ) { }


  @post('/posts')
  async createPost(@requestBody() post: Post) {
    let projectExists: boolean = !!(await this.projectRepo.count({ id: post.project_id }));
    if (!projectExists) {
      throw new HttpErrors.Unauthorized('Project Does not exist');
    }
    return await this.postRepo.create(post);
  }

  @get('/posts/{id}')
  async getPostByID(@param.path.number('id') id: number): Promise<Post> {
    let postExists: boolean = !!(await this.postRepo.count({ id }));
    if (!postExists) {
      throw new HttpErrors.BadRequest(`post ID ${id} does not exist`);
    }
    return await this.postRepo.findById(id);
  }
  @get('/posts')
  async getAllPosts(): Promise<Array<Post>> {
    return await this.postRepo.find();
  }


}
