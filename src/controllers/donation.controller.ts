import { DonationRepository } from "../repositories/donation.repository";
import { UserRepository } from "../repositories/user.repository";
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Donation } from "../models/donation";
import { CharityRepository } from "../repositories/charity.repository";
import { Payment_MethodRepository } from "../repositories/payment_method.repository";


export class DonationController {

  constructor(
    @repository(DonationRepository.name) private donationRepo: DonationRepository,
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(CharityRepository.name) private charityRepo: CharityRepository,
    @repository(Payment_MethodRepository) private paymentRepo: Payment_MethodRepository
  ) { }


  /*
    @post('/donations2/{user_id}/{charity_id}')
    async createDonation(
      @param.path.number('user_id') user_id: number,
      @param.path.number('charity_id') charity_id: number,
      @param.query.number('donation_amount') donation_amount: number,
      @param.query.date('date') date: Date
    ) {
      var donation = new Donation;

      let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));

      if (!userExists) {
        throw new HttpErrors.Unauthorized('User Does not exist');
      }
      // if (userExists) {
      //   console.log('user exists')
      // }

      donation.user_id = user_id;

      let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));

      if (!charityExists) {
        throw new HttpErrors.Unauthorized('Charity Does not exist');
      }

      donation.charity_id = charity_id;
      console.log(donation_amount);
      donation.amount_donated = donation_amount;

      return await this.donationRepo.create(donation);
    }
  */
  @post('/donations')
  async newDonation(
    @requestBody() donation: Donation
  ) {
    let userExists: boolean = !!(await this.userRepo.count({ id: donation.user_id }));
    if (!userExists) {
      throw new HttpErrors.Unauthorized('User Does not exist');
    }

    let charityExists: boolean = !!(await this.charityRepo.count({ id: donation.charity_id }));

    if (!charityExists) {
      throw new HttpErrors.Unauthorized('Charity Does not exist');
    }

    let paymentExists: boolean = !!(await this.paymentRepo).count({ id: donation.pm_id });
    if (!paymentExists) {
      throw new HttpErrors.Unauthorized('Payment does not exist');
    }
    console.log("Donation");
    var payment = await this.paymentRepo.findById(donation.pm_id)
    console.log("Don");
    var stripe = require("stripe")("sk_test_3P0s9sObeFYsv3djqj0ec7kJ");
    var charge = await stripe.charges.create({
      amount: donation.amount_donated,
      currency: "usd",
      source: payment.cardSource,
      description: "$" + donation.amount_donated + " charged"
    })
    return await this.donationRepo.create(donation);
  }

  @get('/donations')
  async getAllDonations(): Promise<Array<Donation>> {
    return await this.donationRepo.find();
  }

  @get('/donations')
  async getDonationsbyCharityID(@param.query.number('charity_id') charity_id: number): Promise<Array<Donation>> {
    let charityExists: boolean = !!(await this.charityRepo.count({ id: charity_id }));
    if (!charityExists) {
      throw new HttpErrors.BadRequest("Charity does not exist");
    }
    return this.donationRepo.find({ where: { charity_id: charity_id } });
  }

  @get('/donationsId')
  async getDonationsbyUserID(@param.query.number('user_id') user_id: number): Promise<Array<Donation>> {
    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));
    if (!userExists) {
      throw new HttpErrors.BadRequest("User does not exist");
    }
    return this.donationRepo.find({ where: { user_id: user_id } });
  }

  //donations made from one date to another?
}
