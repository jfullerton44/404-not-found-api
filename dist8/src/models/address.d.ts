import { Entity } from '@loopback/repository';
export declare class Address extends Entity {
    id: number;
    user_id: number;
    bank_id: number;
    charity_id: number;
    street: string;
    city: string;
    state: string;
    zip: string;
}
