import { Entity } from '@loopback/repository';
export declare class Donation extends Entity {
    id: number;
    charity_id: number;
    user_id: number;
    amount_donated: number;
    date: string;
    getId(): number;
}
