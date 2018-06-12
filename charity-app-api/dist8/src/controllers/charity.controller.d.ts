import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
export declare class CharityController {
    private charityRepo;
    constructor(charityRepo: CharityRepository);
    createCharity(charity: Charity): Promise<Charity>;
    getAllCharities(): Promise<Array<Charity>>;
    getCharityByID(id: number): Promise<Charity>;
    deleteCharityByID(id: number): Promise<Boolean>;
    updateCharity(id: number, charity: Charity): Promise<boolean>;
    replaceCharity(id: number, charity: Charity): Promise<boolean>;
}
