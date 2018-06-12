import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Bank } from '../models/bank';

export class BankRepository extends DefaultCrudRepository<
  Bank,
  typeof Bank.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Bank, datasource);
  }
}