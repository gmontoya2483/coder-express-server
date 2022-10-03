import knex from "knex";


export class ContenedorKnex {

    constructor(config, table) {
        this.knexCli = knex(config);
        this.table = table;
    }


    async create(data) {
        try {
            return await this.knexCli(this.table).insert(data)
        } catch (error) {
            throw new Error(error);
        }
    }


    async update(data) {
        try {
            return await this.knexCli.from(this.table).where({id: data.id}).update(data)
        }catch (error){
            throw new Error(error);
        }
    }


    async getById(id){
        try {
            return await this.knexCli.from(this.table).select('*').where({id});
        } catch (error) {
            throw new Error(error)
        }
    }


    async getAll() {


        try {
            return await this.knexCli.from(this.table).select('*').orderBy('id', 'asc');
        } catch (error) {
            throw new Error(error);
        }
    }



    async deleteById(id) {
        try {
          return await this.knexCli.from(this.table).where({id}).del();
        } catch (error) {

        }
    }

    async closeConnection() {
        return await this.knexCli.destroy();
    }


}








