import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    description: string;
    descriptionFull: string;
    photoLink: string;
    photoLink2: string;
    website: string;
    getId(): number | undefined;
}
