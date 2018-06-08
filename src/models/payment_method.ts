import {Entity, property, model} from '@loopback/repository';

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
    type: 'string'
  })
  creditCardNumber: string;

  @property({
    type: 'string'
  })
  expirationDate: Date;

  @property({
    type: 'string'
  })
  securityCode: string;

  @property({
    type: 'string'
  })
  nameOnCard: string;

  getId() {
    return this.id;
  }
}