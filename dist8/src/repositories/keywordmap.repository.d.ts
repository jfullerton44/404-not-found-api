import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { KeywordMap } from '../models/keywordmap';
export declare class KeywordMapRepository extends DefaultCrudRepository<KeywordMap, typeof KeywordMap.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
