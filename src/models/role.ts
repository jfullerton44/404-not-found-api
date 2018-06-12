import {property, model, Entity} from '@loopback/repository';

@model({
    name: 'role'
})

export class Role extends Entity{
    @property({
        type: 'number',
        id: true,
        required: true
    })
    id: number;

    @property({
        type: 'string',
        required: true
    })
    name: string;

    //File access property

    getId(){
        return this.id;
    }
}