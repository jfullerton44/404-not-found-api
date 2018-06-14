import { Entity, property, model } from '@loopback/repository';

@model({
  name: "project"
})
export class Project extends Entity {
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
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string'

  })
  description: string;

  @property({
    type: 'string'
  })
  photoLink: string;


  getId() {
    return this.id;
  }
}
