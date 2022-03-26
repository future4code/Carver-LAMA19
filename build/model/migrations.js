"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDatabase_1 = require("../data/UserDatabase");
const userDB = new UserDatabase_1.UserDatabase();
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userDB.Connection().raw(`CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
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
      `);
    }
    catch (error) {
        console.log(error.message);
    }
});
createTable();
//# sourceMappingURL=migrations.js.map