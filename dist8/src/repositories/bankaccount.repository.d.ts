import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { BankAccount } from '../models/bankaccount';
export declare class BankAccountRepository extends DefaultCrudRepository<BankAccount, typeof BankAccount.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
