import Knex from "knex"
import { BaseDatabase } from "../data/BaseDatabase"
import { UserDatabase } from "../data/UserDatabase"

const userDB = new UserDatabase()

const createTable = async(): Promise<void> =>{
  try {
    await userDB.Connection().raw(

      `CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL);
      
      CREATE TABLE IF NOT EXISTS NOME_TABELA_SHOWS (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
      );
      
      CREATE TABLE IF NOT EXISTS NOME_TABELAS_USUÁRIOS (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
      );  
      `
      )
  } catch (error) {
    console.log(error.message)
  }
  
}

createTable()


