import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Keyword } from '../models/keyword';
export declare class KeywordRepository extends DefaultCrudRepository<Keyword, typeof Keyword.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
