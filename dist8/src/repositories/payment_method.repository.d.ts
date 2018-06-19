import { DefaultCrudRepository } from "@loopback/repository";
import { DataSource } from 'loopback-datasource-juggler';
import { Payment_Method } from "../models/payment_method";
export declare class Payment_MethodRepository extends DefaultCrudRepository<Payment_Method, typeof Payment_Method.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
