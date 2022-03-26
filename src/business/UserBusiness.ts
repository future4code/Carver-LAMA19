import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import UserRepository from "./UserRepository";
import { CustomError } from "../error/CustomError";

export default class UserBusiness {
    private userDatabase: UserRepository
    private idGenerator: IdGenerator
    private hashManager: HashManager
    private authenticator: Authenticator


    constructor(userImplementation: UserRepository) {
        this.userDatabase = userImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    async createUser(user: UserInputDTO) {
        try {
            if (!user.name || !user.email || !user.password || !user.role) {

                throw new CustomError(422, "Missing input");
            }
            const id = this.idGenerator.generate();

            const hashPassword = await this.hashManager.hash(user.password);

            const userInput = {
                id: id,
                email: user.email,
                name: user.name,
                password: hashPassword,
                role: User.stringToUserRole(user.role)
            }

            const newUser = User.toUserModel(userInput)

            await this.userDatabase.createUser(newUser);

            const tokenInput = { id: id, role: user.role }

            const accessToken = this.authenticator.generateToken(tokenInput);

            return accessToken;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getUserByEmail(user: LoginInputDTO) {

        if (!user.email || !user.password) {
            throw new CustomError(422, "Missing input");
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new CustomError(401, "Invalid credentials");
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new CustomError(401, "Invalid Password!");
        }

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        

        return accessToken;
    }
}