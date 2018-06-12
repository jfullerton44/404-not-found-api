import { Entity } from '@loopback/repository';
export declare class Address extends Entity {
    id?: number;
    user_id: number;
    fullName: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    zipCode: string;
    state: string;
    getId(): number | undefined;
}
