import { DefaultCrudRepository } from "@loopback/repository";
import { inject } from "@loopback/core";
import { DataSource } from 'loopback-datasource-juggler';
import { Address } from "../models/address";



export class AddressRepository extends DefaultCrudRepository<
Address,
typeof Address.prototype.id
>{
    constructor(@inject('datasources.db') protected datasource: DataSource){
        super(Address,datasource);
    }
}