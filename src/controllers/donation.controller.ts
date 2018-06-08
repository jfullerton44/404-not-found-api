import { DonationRepository } from "../repositories/donation.repository";
import { UserRepository } from "../repositories/user.repository";
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Donation } from "../models/donation";
import { CharityRepository } from "../repositories/charity.repository";


export class DonationController {

  constructor(
    @repository(DonationRepository.name) private donationRepo: DonationRepository,
    @repository(UserRepository.name) private userRepo: UserRepository,
    @repository(CharityRepository.name) private charityRepo: CharityRepository
  ) {}



  @post('/donations/{user_id}/{charity_id}')
  async createDonation(
  @param.path.number('user_id') user_id: number,
  @param.path.number('charity_id') charity_id: number,
  @param.query.number('donation_amount') donation_amount: number,
  @param.query.date('date') date: Date
) {
    var donation = new Donation;

    let userExists: boolean = !!(await this.userRepo.count({ id: user_id }));

    if(!userExists){
      throw new HttpErrors.Unauthorized('User Does not exist');
    }
    if(userExists){
      console.log('user exists')
    }
    
    donation.user_id=user_id;

    let charityExists: boolean = !!(await this.charityRepo.count({id: charity_id}));

    if(!charityExists){
      throw new HttpErrors.Unauthorized('Charity Does not exist');
    }
    
    donation.charity_id=charity_id;
    donation.amount_donated= donation_amount;

    return await this.donationRepo.create(donation);
  }

  @post('/donations')
  async newDonation(
  @requestBody() donation:Donation
  ){
    let userExists: boolean = !!(await this.userRepo.count({ id: donation.user_id }));
    if(!userExists){
      throw new HttpErrors.Unauthorized('User Does not exist');
    }
    
    let charityExists: boolean = !!(await this.charityRepo.count({id: donation.charity_id}));


    if(!charityExists){
      throw new HttpErrors.Unauthorized('Charity Does not exist');
    }
    return await this.donationRepo.create(donation);
  }

  @get('/donations')
  async getAllDonations(): Promise<Array<Donation>> {
    return await this.donationRepo.find();
  }
}