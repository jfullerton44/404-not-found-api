import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    dob: Date;
    getId(): number;
}
