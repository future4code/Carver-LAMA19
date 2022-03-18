import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import UserRepository from "./UserRepository";

export default class UserBusiness {
    private userDatabase: UserRepository
    private idGenerator: IdGenerator
    private hashManager: HashManager
    private authenticator: Authenticator
    

    constructor(userImplementation: UserRepository){
        this.userDatabase = userImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    async createUser(user: UserInputDTO) {
 
        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        const newUser: User = new User(
            id, 
            user.email, 
            user.name, 
            hashPassword, 
            User.stringToUserRole(user.role)
         )

        await this.userDatabase.createUser(newUser);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}