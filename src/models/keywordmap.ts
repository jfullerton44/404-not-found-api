import { property, Entity, model } from '@loopback/repository';

@model({
  name: "keywordmap"
})

export class KeywordMap extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id: number;
  @property({
    type: 'number',
    required: true
  })
  project_id: number;

  @property({
    type: 'number',
    required: true
  })
  keyword_id: number;

}
