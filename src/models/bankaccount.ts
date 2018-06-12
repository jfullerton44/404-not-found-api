import { property, Entity, model } from '@loopback/repository';

@model({
    name: "bankaccounts"
})

export class BankAccount extends Entity{
    @property({
        type: 'number',
        required: true
    })
    charity_id: number;

    @property({
        type: 'number',
        required: true
    })
    bank_id: number;

    @property({
        type: 'number',
        required: true
    })
    accountNum: number;

    @property({
        type:'number',
        required:true
    })
    routingNum: number;

}