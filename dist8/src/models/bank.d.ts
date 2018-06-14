import { Entity } from '@loopback/repository';
export declare class Bank extends Entity {
    id?: number;
    name: string;
    getId(): number | undefined;
}
