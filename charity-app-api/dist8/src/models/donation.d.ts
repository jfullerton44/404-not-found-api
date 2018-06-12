import { Entity } from '@loopback/repository';
export declare class Donation extends Entity {
    id?: number;
    amount_donated: number;
    charity_id: number;
    user_id: number;
    date: Date;
    getId(): number | undefined;
}
