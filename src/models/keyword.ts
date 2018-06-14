import { property, Entity, model } from '@loopback/repository';

@model({
    name: "keyword"
})

export class Keyword extends Entity {
    @property({
        type: 'number',
        required: true,
        id: true
    })
    id: number;

    @property({
        type: 'string',
        required: true
    })
    keyword: string;

}
