import mongoose from 'mongoose';
import {config} from '../utils/config.js';


const strConn = config.mongo_db.url
mongoose.connect(strConn, config.mongo_db.options)
    .then(()=>{
        console.log('Base de datos conectada!');
    })
    .catch((err) => {
        console.error('No se pudo conectar a la base de datos', err)
    })

export class ContenedorMongo {
    constructor( entityModel ) {
        this.entityModel = entityModel;
    }

    async create(data) {
        try {
            return  await this.entityModel.create(data);
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo crear la entidad - ${this.entityModel.modelName}`);
        }
    }


    async deleteById(id) {
        try {
            return await this.entityModel.findByIdAndDelete(id);
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo eliminar entidad - ${this.entityModel.modelName}`);
        }
    }

    async getAll() {
        try {
            return  await this.entityModel.find();
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo buscar entidades - ${this.entityModel.modelName}`);
        }

    }

    async getById(id) {
        try {
            return  await this.entityModel.findById(id);
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo buscar entidad - ${this.entityModel.modelName}`);
        }
    }

    async update(data) {
        const {id, ...obj}  = data;
        try {
            return await this.entityModel.findByIdAndUpdate(id, obj, {new: true});
        } catch (err) {
            console.error(`${this.entityModel.modelName}, ${ err }`);
            throw new Error(`No se pudo modificar entidad - ${this.entityModel.modelName}`);
        }
    }

}
