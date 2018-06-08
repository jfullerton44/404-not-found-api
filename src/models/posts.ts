import {Entity, property, model} from '@loopback/repository';

@model({
    name: "post"
})
export class Post extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'number',
    required: true
  })
  project_id: number;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string'
  })
  body: string;

  @property({
    type: 'string'
  })
  photoLink: string;



  getId() {
    return this.id;
  }
}