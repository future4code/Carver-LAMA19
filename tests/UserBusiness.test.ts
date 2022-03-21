import UserBusiness from "../src/business/UserBusiness"
import AuthenticatorMock from "../src/mocks/authenticatorMock"
import HashManagerMock from "../src/mocks/hashManagerMock"
import IdGeneratorMock from "../src/mocks/idGeneretorMock"
import UserDatabaseMock from "../src/mocks/userDatabaseMock"
import { User, UserInputDTO } from "../src/model/User"
import { userMock } from "../src/model/userMock"


const userBusinessMock = new UserBusiness(
    new UserDatabaseMock() as any    
)


describe("Teste da entidade User", ()=>{
    test("Teste createUser, usuário com parâmetros faltando", async()=>{
        
        try {
            const userMockado: any = {...userMock, name: ""}

            const createUser = jest.fn((user: UserInputDTO)=> {return userBusinessMock.createUser(user)})

            const result = await createUser(userMockado)
            
            
        } catch (error: any) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    })
    
    // test("Teste getUserById, usuário não existente", async ()=>{
    //     expect.assertions
    //     try {
    //         const userMockado: any = {
    //             // id: userMock.getId(),
    //             id: "abc",
    //             token: "token"
    //         }
    //        const getUserById = jest.fn((id: string)=> userBusinessMock.getUserById(id)) 
    //        const result =  await getUserById(userMockado)
    //        console.log(result)
    //     } catch (error) {
    //         expect(error.message).toBe("User not found")
    //         expect(error.statusCode).toBe(404)
    //     }
    // })

    // test("Teste getUserById, resposta sucesso", async ()=>{
    //     expect.assertions(2)        
    //     try {
    //         const userMockado: any = {
    //             id: userMock.getId(),
    //             token: "token"
    //         }

    //         const getUserById = jest.fn((user: any)=> userBusinessMock.getUserById(user))

    //        const result =  await getUserById(userMockado)
           
    //        expect(getUserById).toHaveBeenCalledWith(userMockado)
    //        expect(result).toEqual({
    //         id: "id_mockado",
    //         name: "astrodev",
    //         email: "astrodev@gmail.com",
    //         password: "astrodev123",
    //         role: "ADMIN"
    //        })

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // })
})
