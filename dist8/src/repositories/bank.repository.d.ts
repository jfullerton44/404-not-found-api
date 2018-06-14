import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Bank } from '../models/bank';
export declare class BankRepository extends DefaultCrudRepository<Bank, typeof Bank.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
