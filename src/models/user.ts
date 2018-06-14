import { Entity, property, model } from '@loopback/repository';

@model({
  name: "user"
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number;

  @property({
    type: 'string'

  })
  email: string;

  @property({
    type: 'string'

  })
  firstName: string;

  @property({
    type: 'string'
  })
  lastName: string;

  @property({
    type: 'string',
    required: true
  })
  username: string;

  @property({
    type: 'string',
    required: true
  })
  password: string;

  @property({
    type: 'string',
  })
  dob: string

  getId() {
    return this.id;
  }
}
