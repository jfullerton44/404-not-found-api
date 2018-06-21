import { Entity, property, model } from '@loopback/repository';

@model({
  name: "donation"
})
export class Donation extends Entity {
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
    type: 'number',
    required: true
  })
  user_id: number;

  @property({
    type: 'int',
    required: true
  })
  pm_id: number;

  @property({
    type: 'number'
  })
  amount_donated: number;

  @property({
    type: 'string'
  })
  date: string;


  getId() {
    return this.id;
  }
}
