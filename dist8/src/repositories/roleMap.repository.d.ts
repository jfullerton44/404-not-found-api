import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Rolemap } from '../models/roleMap';
export declare class RolemapRepository extends DefaultCrudRepository<Rolemap, typeof Rolemap.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
