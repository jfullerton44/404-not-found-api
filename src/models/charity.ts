import {Entity, property, model} from '@loopback/repository';

@model({
    name: "charity"
})
export class Charity extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

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
  descriptionFull: string;

  @property({
    type: 'string'
  })
  photoLink: string;

  @property({
    type: 'string'

  })
  photoLink2: string;

  @property({
    type: 'string'
  
  })
  website: string;


  getId() {
    return this.id;
  }
}