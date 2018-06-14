import { property, model, Entity } from '@loopback/repository';

@model({
    name: 'rolemap'
})

export class Rolemap extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id: number;

    @property({
        type: 'number',
        required: true
    })
    user_id: number;

    @property({
        type: 'number',
        required: true
    })
    role_id: number;
}
