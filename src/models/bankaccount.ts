import { property, Entity, model } from '@loopback/repository';

@model({
    name: "bankaccount"
})

export class BankAccount extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id: number;

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
        type: 'string',
        required: true
    })
    accountNum: string;

    @property({
        type: 'string',
        required: true
    })
    routingNum: string;

}
