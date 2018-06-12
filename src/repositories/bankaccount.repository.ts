import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { BankAccount } from '../models/bankaccount';

export class BankAccountRepository extends DefaultCrudRepository<
  BankAccount,
  typeof BankAccount.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(BankAccount, datasource);
  }
}