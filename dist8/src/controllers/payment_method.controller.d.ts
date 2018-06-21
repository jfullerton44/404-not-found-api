import { Payment_MethodRepository } from "../repositories/payment_method.repository";
import { Payment_Method } from "../models/payment_method";
import { UserRepository } from "../repositories/user.repository";
export declare class Payment_MethodController {
    private payment_methodRepo;
    private userRepo;
    constructor(payment_methodRepo: Payment_MethodRepository, userRepo: UserRepository);
    createPayment_Method(payment_method: Payment_Method): Promise<Payment_Method>;
    getPaymentByID(id: number): Promise<Payment_Method>;
    getAllPayment_Methods(): Promise<Array<Payment_Method>>;
    removePayment(id: number): Promise<boolean>;
}
