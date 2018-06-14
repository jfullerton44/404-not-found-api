import { Entity, property, model } from '@loopback/repository';

@model({
  name: "payment_method"
})
export class Payment_Method extends Entity {
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
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'number',
    length: 4
  })
  lastFourCardNum: number;

  @property({
    type: 'string',
    length: 2048
  })
  cardToken: string;
  getId() {
    return this.id;
  }
}
