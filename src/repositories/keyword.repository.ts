import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Keyword } from '../models/keyword';

export class KeywordRepository extends DefaultCrudRepository<
  Keyword,
  typeof Keyword.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Keyword, datasource);
  }
}