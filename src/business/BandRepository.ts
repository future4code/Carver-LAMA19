import { Band } from "../model/Band";

export default interface BandRepository{
    createBand(user: Band): Promise<Band>
    getBandById(id: string): Promise<Band> 
    getBandByName(name: string): Promise<Band>
}