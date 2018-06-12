import { Post } from "../models/posts";
import { PostRepository } from "../repositories/post.repository";
import { ProjectRepository } from "../repositories/project.repository";
export declare class PostController {
    private postRepo;
    private projectRepo;
    constructor(postRepo: PostRepository, projectRepo: ProjectRepository);
    createPost(post: Post): Promise<Post>;
    getUserByID(id: number): Promise<Post>;
    getAllPosts(): Promise<Array<Post>>;
}
