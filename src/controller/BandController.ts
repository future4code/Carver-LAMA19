import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import BandDatabase from "../data/BandDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";

const bandBusiness = new BandBusiness(new BandDatabase())

export default class BandController {
    
    constructor() {}

    async insertBand(req: Request, res: Response) {

        const input: BandInputDTO = {
            name: req.body.name,
            music_genre: req.body.music_genre,
            responsible: req.body.responsible 
        }
        const token: any = req.headers.authorization
        
        try {
            const message = await bandBusiness.insertBand(input, token)

            res.status(200).send({ message });

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getBand(req: Request, res: Response) {

        try {

            const id: any = req.query.id
            const name: any = req.query.name

            const band = await bandBusiness.getBand(id, name)

            res.status(200).send({ band });

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}