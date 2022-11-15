import knex from "knex";
import {logger} from "../utils/logger.js";


export class ContenedorKnex {

    constructor(config, table) {
        this.knexCli = knex(config);
        this.table = table;
    }


    async create(data) {
        try {
            return await this.knexCli(this.table).insert(data)
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }


    async update(data) {
        try {
            return await this.knexCli.from(this.table).where({id: data.id}).update(data)
        }catch (error){
            logger.error(error);
            throw new Error(error);
        }
    }


    async getById(id){
        try {
            return await this.knexCli.from(this.table).select('*').where({id});
        } catch (error) {
            logger.error(error);
            throw new Error(error)
        }
    }


    async getAll() {


        try {
            return await this.knexCli.from(this.table).select('*').orderBy('id', 'asc');
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }



    async deleteById(id) {
        try {
          return await this.knexCli.from(this.table).where({id}).del();
        } catch (error) {
            logger.error(error);
        }
    }

    async closeConnection() {
        return await this.knexCli.destroy();
    }


}








