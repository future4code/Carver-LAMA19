import { User } from "./User";

const user1 = {
    id: "id_mockado",
    name: "astrodev",
    email: "astrodev@gmail.com",
    password: "astrodev123",
    role: "ADMIN"
    
}
export const userMock = User.toUserModel(user1)

const user2 = {
    id: "id_mockado_2",
    name: "astrodev2",
    email: "astrodev2@gmail.com",
    password: "astrodev123",
    role: "NORMAL"
    
}
export const userMock2 = User.toUserModel(user2)