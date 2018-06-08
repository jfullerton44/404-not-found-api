import {Entity, property, model} from '@loopback/repository';

@model({
    name: "address"
})
export class Address extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'number',
    required: true
  })
  user_id: number;

  @property({
    type: 'string'
  })
  fullName: string;

  @property({
    type: 'string'
  })
  streetAddress1: string;

  @property({
    type: 'string'
  })
  streetAddress2: string;

  @property({
    type: 'string'
  })
  city: string;

  @property({
    type: 'string'
  })
  zipCode: string;

  @property({
    type: 'string'
  })
  state: string;

  getId() {
    return this.id;
  }
}