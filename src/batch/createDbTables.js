import knex from 'knex';
import { config } from '../utils/config.js';


const mariaDb = () => {
    const knexCli = knex(config.stock_db);

    knexCli.schema.dropTableIfExists('productos')
        .then(()=>{
            knexCli.schema.createTable('productos', table => {
                table.increments('id').primary();
                table.string('title', 50).notNullable();
                table.float('price').notNullable();
                table.string('thumbnail', 250).notNullable();
            })
                .then(()=> console.log("Tabla productos creada"))
                .catch(err=> {
                    console.log(err);
                    throw err;
                })
                .finally(()=>{
                    knexCli.destroy().then();
                });
        });
}


const sqlLiteDb = () => {
    const knexCli = knex(config.chat_db);

    knexCli.schema.dropTableIfExists('mensajes')
        .then(()=> {
            knexCli.schema.createTable('mensajes', table => {
                table.increments('id').primary();
                table.string('author', 50).notNullable();
                table.string('text', 250).notNullable();
                table.string('date', 30).notNullable();

            })
                .then(()=> console.log("Tabla mensajes creada"))
                .catch(err => {
                    console.log(err);
                    throw err;
                })
                .finally(()=> {
                    knexCli.destroy().then();
                })
        })
}


mariaDb();
sqlLiteDb();


