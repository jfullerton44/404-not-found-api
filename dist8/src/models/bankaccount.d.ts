import { Entity } from '@loopback/repository';
export declare class BankAccount extends Entity {
    id: number;
    charity_id: number;
    bank_id: number;
    accountNum: number;
    routingNum: number;
}
