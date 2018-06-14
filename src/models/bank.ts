import {Entity,property,model} from '@loopback/repository';

@model({
    name: "bank"
})
export class Bank extends Entity{
    @property({
        type: 'number',
        id: true,
        required: true
    })
    id?: number;
    @property({
        type: 'string',
        required: true
    })
    name:string;
    getId(){
        return this.id;
    }
}