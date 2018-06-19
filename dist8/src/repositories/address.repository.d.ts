import { DefaultCrudRepository } from "@loopback/repository";
import { DataSource } from 'loopback-datasource-juggler';
import { Address } from "../models/address";
export declare class AddressRepository extends DefaultCrudRepository<Address, typeof Address.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
