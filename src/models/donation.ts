import { Entity, property, model } from '@loopback/repository';

@model({
  name: "donation"
})
export class Donation extends Entity {
  @property({
    type: 'number'
  })
  amount_donated: number;

  @property({
    type: 'number',
    required: true
  })
  charity_id: number;

  @property({
    type: 'number',
    required: true
  })
  user_id: number;

  @property({
    type: 'string'
  })
  date: Date;


  getId() {
    return this.id;
  }
}
