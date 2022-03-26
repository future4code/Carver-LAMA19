import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import Knex from "knex";
import UserRepository from "../business/UserRepository";

export default class UserDatabase extends BaseDatabase implements UserRepository {

  private static TABLE_NAME = "NOME_TABELAS_USUÁRIOS";
 
  public async createUser(user: User): Promise<User> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          password: user.getPassword(),
          role: user.getRole()
        })
        .into(UserDatabase.TABLE_NAME);
        return user
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

  public Connection(): Knex {
    return this.getConnection()
  }



}
