import { Entity } from '@loopback/repository';
export declare class Post extends Entity {
    id?: number;
    project_id: number;
    name: string;
    body: string;
    photoLink: string;
    getId(): number | undefined;
}
