import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    description: string;
    descriptionFull: string;
    email: string;
    photoLink: string;
    photoLink2: string;
    phone: string;
    website: string;
    getId(): number | undefined;
}
