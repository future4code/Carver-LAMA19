import { User } from "../model/User";
import { userMock, userMock2 } from "../model/userMock";

export default class UserDatabaseMock{
    public async createUser(user: User): Promise<User>{
        return userMock
    }
    
    public async getUserByEmail(email: string): Promise<User | undefined> {
        if(email === "astrodev@gmail.com"){
            return userMock
        }else if(email === "astrodev2@gmail.com"){
            return userMock2
        }else {
            return undefined
        }
    }
}