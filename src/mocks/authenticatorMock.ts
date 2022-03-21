
import { User } from "../model/User"
import { AuthenticationData } from "../services/Authenticator";


export default class AuthenticatorMock{
    public generate = (input: AuthenticationData): string => {return "token_mockado"}

    public verify(token: string) {return {id: "id_mockado", role: User.stringToUserRole("NORMAL") }}
}