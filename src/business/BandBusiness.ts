import { CustomError } from "../error/CustomError"
import { Band, BandInputDTO } from "../model/Band"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import BandRepository from "./BandRepository"

export default class BandBusiness {
    private bandDatabase: BandRepository
    private idGenerator: IdGenerator
    private authenticator: Authenticator


    constructor(bandImplementation: BandRepository) {
        this.bandDatabase = bandImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    async insertBand(band: BandInputDTO, token: string) {
        if (!band.name || !band.music_genre || !band.responsible) {
            const message = '"name", "music gender" and "responsible" must be provided'
            throw new CustomError(400, message)
        }

        if (!token) {
            const message = 'Unauthorized'
            throw new CustomError(401, message)
        }

        const verifyToken = this.authenticator.getData(token)

        if (verifyToken.role !== "ADMIN") {
            const message = 'Unauthorized'
            throw new CustomError(401, message)
        }

        const id = this.idGenerator.generate();

        const bandInput: any = {
            id: id,
            name: band.name,
            music_genre: band.music_genre,
            responsible: band.responsible
        }

        const newBand: Band = Band.toBandModel(bandInput)

        await this.bandDatabase.createBand(newBand);

        let message = "succes!"

        return message;
    }

    async getBand(id: string, name: string) {


        if (id && !name) {
            const bandInput: Band = await this.bandDatabase.getBandById(id)

            if (!bandInput) {
                throw new CustomError(404, "No bands found")
            }

            return bandInput
        }

        if (!id && name) {
            const bandInput = await this.bandDatabase.getBandByName(name)

            if (!bandInput) {
                throw new CustomError(404, "No bands found")
            }

            return bandInput
        }
            
    }
}