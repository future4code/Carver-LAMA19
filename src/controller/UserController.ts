import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import UserBusiness from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import UserDatabase from "../data/UserDatabase";

const userBusiness = new UserBusiness(new UserDatabase())

export default class UserController {
    
    constructor() {}

    async signup(req: Request, res: Response) {

        const input: UserInputDTO = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }
        try {
            const token = await userBusiness.getUserByEmail(input)

            res.status(200).send({ token });

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await userBusiness.getUserByEmail(loginData)

            res.status(200).send({ token });

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}