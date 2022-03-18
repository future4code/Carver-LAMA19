import { User } from "../model/User";

export default interface UserRepository{
    createUser(user: User): Promise<User>
    getUserByEmail(email: string): Promise<User>  
}