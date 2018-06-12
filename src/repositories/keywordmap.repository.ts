import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { KeywordMap } from '../models/keywordmap';

export class KeywordMapRepository extends DefaultCrudRepository<
  KeywordMap,
  typeof KeywordMap.prototype.id
  > {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(KeywordMap, datasource);
  }
}
