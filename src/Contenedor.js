const fs = require('fs') ;
const geRandomInt = require('./random');

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(data) {
        const objs = await this.getAll();
        let newId = objs.length === 0 ? 1 : objs[objs.length - 1].id + 1;
        const newData = {...data, id: newId};
        objs.push(newData);
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(objs,null,2), 'utf-8');
            return newId;
        } catch(error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        const objs = await this.getAll();
        return objs.find(obj => obj.id === id) || null;
    }

    async getAll() {
        try {
            const objs = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }

    async getRandom() {
        const objs = await this.getAll();
        return !objs.length
            ? {}
            : objs[geRandomInt(0, objs.length)];
    }

    async deleteById(id) {
        const objs = await this.getAll();
        const newObjs = objs.filter(obj => obj.id !== id);
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(newObjs), 'utf-8');
        } catch(error) {
            throw new Error(error);
        }

    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]), 'utf-8');
        } catch(error) {
            throw new Error(error);
        }
    }


}

module.exports = Contenedor;







