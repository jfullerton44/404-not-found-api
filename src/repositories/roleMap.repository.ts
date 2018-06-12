import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Rolemap } from '../models/roleMap';

export class RolemapRepository extends DefaultCrudRepository<
  Rolemap,
  typeof Rolemap.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Rolemap, datasource);
  }
}