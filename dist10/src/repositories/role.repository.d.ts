import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Role } from '../models/role';
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
