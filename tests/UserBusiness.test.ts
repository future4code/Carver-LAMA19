import UserBusiness from "../src/business/UserBusiness"
import AuthenticatorMock from "../src/mocks/authenticatorMock"
import HashManagerMock from "../src/mocks/hashManagerMock"
import IdGeneratorMock from "../src/mocks/idGeneretorMock"
import UserDatabaseMock from "../src/mocks/userDatabaseMock"
import { LoginInputDTO, User, UserInputDTO } from "../src/model/User"
import { userMock } from "../src/model/userMock"


const userBusinessMock = new UserBusiness(
    new UserDatabaseMock() as any
)


describe("Teste da entidade User", () => {
    test("Teste createUser, usuário com parâmetros faltando", async () => {

        try {
            const userMockado: any = { ...userMock, name: "" }

            const createUser = jest.fn((user: UserInputDTO) => { return userBusinessMock.createUser(user) })

            const result = await createUser(userMockado)

        } catch (error: any) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Teste createUser, caso de sucesso", async () => {

        try {
            const userMockado: any = { ...userMock }

            const createUser = jest.fn((user: UserInputDTO) => { return userBusinessMock.createUser(user) })

            const result = await createUser(userMockado)

            expect(result).toHaveBeenCalledWith(userMockado)
            expect(result).toEqual({
                id: "id_mockado",
                name: "astrodev",
                email: "astrodev@gmail.com",
                password: "astrodev123",
                role: "ADMIN"
            })

        } catch (error: any) {
            console.log(error.message)
        }
    })

    test("Teste getUserByEmail, missing input", async ()=>{
        
        try {
            const userMockado: any = {
                email: "",
                password: "123456"
            }
           const getUserByEmail = jest.fn((user: LoginInputDTO)=> userBusinessMock.getUserByEmail(user)) 
           const result =  await getUserByEmail(userMockado)
           console.log(result)
        } catch (error: any) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    })

    test("Teste getUserByEmail, usuário inexistente", async ()=>{
        
        try {
            const userMockado: any = {
                email: "bugil@lbn.com",
                password: "123456"
            }
           const getUserByEmail = jest.fn((user: LoginInputDTO)=> userBusinessMock.getUserByEmail(user)) 
           const result =  await getUserByEmail(userMockado)
           console.log(result)
        } catch (error: any) {
            expect(error.message).toBe("Invalid credentials")
            expect(error.statusCode).toBe(401)
        }
    })

    test("Teste getUserByEmail, senha incorreta", async ()=>{
        
        try {
            const userMockado: any = {
                email: userMock.getEmail(),
                password: "123654"
            }
           const getUserByEmail = jest.fn((user: LoginInputDTO)=> userBusinessMock.getUserByEmail(user)) 
           const result =  await getUserByEmail(userMockado)
           console.log(result)
        } catch (error: any) {
            expect(error.message).toBe("Invalid Password!")
            expect(error.statusCode).toBe(401)
        }
    })

    test("Teste getUserByEmail, resposta sucesso", async ()=>{
          
        try {
            const userMockado: any = {
                email: userMock.getEmail(),
                password: userMock.getPassword()
            }

            const getUserByEmail = jest.fn((user: LoginInputDTO)=> userBusinessMock.getUserByEmail(user))

           const result =  await getUserByEmail(userMockado)

           expect(getUserByEmail).toHaveBeenCalledWith(userMockado)
           expect(result).toEqual({
            id: "id_mockado",
            name: "astrodev",
            email: "astrodev@gmail.com",
            password: "astrodev123",
            role: "ADMIN"
           })

        } catch (error: any) {
            console.log(error.message)
        }
    })
})
