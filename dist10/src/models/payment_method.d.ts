import { Entity } from '@loopback/repository';
export declare class Payment_Method extends Entity {
    id?: number;
    user_id: number;
    name: string;
    lastFourCardNum: string;
    cardSource: string;
    clientID: string;
    getId(): number | undefined;
}
