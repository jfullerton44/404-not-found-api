import { DonationRepository } from "../repositories/donation.repository";
import { UserRepository } from "../repositories/user.repository";
import { Donation } from "../models/donation";
import { CharityRepository } from "../repositories/charity.repository";
export declare class DonationController {
    private donationRepo;
    private userRepo;
    private charityRepo;
    constructor(donationRepo: DonationRepository, userRepo: UserRepository, charityRepo: CharityRepository);
    newDonation(donation: Donation): Promise<Donation>;
    getAllDonations(): Promise<Array<Donation>>;
    getDonationsbyCharityID(charity_id: number): Promise<Array<Donation>>;
    getDonationsbyUserID(user_id: number): Promise<Array<Donation>>;
}
