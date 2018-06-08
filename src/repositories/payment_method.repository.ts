import { DefaultCrudRepository } from "@loopback/repository";
import { inject } from "@loopback/core";
import { DataSource } from 'loopback-datasource-juggler';
import { Payment_Method } from "../models/payment_method";



export class Payment_MethodRepository extends DefaultCrudRepository<
Payment_Method,
typeof Payment_Method.prototype.id
>{
    constructor(@inject('datasources.db') protected datasource: DataSource){
        super(Payment_Method,datasource);
    }
}