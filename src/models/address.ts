import { Entity, property, model } from '@loopback/repository';

@model({
  name: "address"
})
export class Address extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number;
  @property({
    type: 'number',
  })
  user_id: number;

  @property({
    type: 'number'
  })
  bank_id: number;

  @property({
    type: 'number'
  })
  charity_id: number;

  @property({
    type: 'string'
  })
  street: string;

  @property({
    type: 'string'
  })
  city: string;

  @property({
    type: 'string'
  })
  state: string;

  @property({
    type: 'string'
  })
  zip: string;

}
