import Knex from "knex";
import BandRepository from "../business/BandRepository";
import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export default class BandDatabase extends BaseDatabase implements BandRepository {

    private static TABLE_NAME = "NOME_TABELA_BANDAS";
   
    public async createBand(band: Band): Promise<Band> {
      try {
        await this.getConnection()
          .insert({
            id: band.getId(),
            name: band.getName(),
            music_genre: band.getGenre(),
            responsible: band.getResponsible()
          })
          .into(BandDatabase.TABLE_NAME);
          return band
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
  
    public async getBandById(id: string): Promise<Band> {
        
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ id });
  
      return Band.toBandModel(result[0]);
    }
  
    public Connection(): Knex {
      return this.getConnection()
    }

    public async getBandByName(name: string): Promise<Band> {
        
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ name });
  
      return Band.toBandModel(result[0]);
    } 
  }