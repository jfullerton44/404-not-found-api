import { repository } from "@loopback/repository";
import { ProjectRepository } from "../repositories/project.repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Payment_MethodRepository } from "../repositories/payment_method.repository";
import { Payment_Method } from "../models/payment_method";
import { UserRepository } from "../repositories/user.repository";


export class Payment_MethodController {
  constructor(
    @repository(Payment_MethodRepository.name) private payment_methodRepo: Payment_MethodRepository,
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }


  @post('/payment_method')
  async createPayment_Method(@requestBody() payment_method: Payment_Method) {
    let userExists: boolean = !!(await this.userRepo.count({ id: payment_method.user_id }));
    if (!userExists) {
      throw new HttpErrors.Unauthorized('User Does not exist');
    }
    return await this.payment_methodRepo.create(payment_method);
  }

  @get('/payment_methods/{id}')
  async getPaymentByID(@param.path.number('id') id: number): Promise<Payment_Method> {
    let payment_methodExists: boolean = !!(await this.payment_methodRepo.count({ id }));
    if (!payment_methodExists) {
      throw new HttpErrors.BadRequest(`payment method ID ${id} does not exist`);
    }
    return await this.payment_methodRepo.findById(id);
  }

  @get('/payment_methods')
  async getAllPayment_Methods(): Promise<Array<Payment_Method>> {
    return await this.payment_methodRepo.find();
  }
}
