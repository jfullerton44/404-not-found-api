import { Entity } from '@loopback/repository';
export declare class Project extends Entity {
    id?: number;
    charity_id: number;
    name: string;
    description: string;
    photoLink: string;
    getId(): number | undefined;
}
