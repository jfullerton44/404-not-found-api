import { Entity } from '@loopback/repository';
export declare class Payment_Method extends Entity {
    id?: number;
    user_id: number;
    creditCardNumber: string;
    expirationDate: Date;
    securityCode: string;
    nameOnCard: string;
    getId(): number | undefined;
}
