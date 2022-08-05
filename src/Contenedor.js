const fs = require('fs') ;

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


async function main() {
    // Instanciar el objeto
    const contenedor = new Contenedor('./archivos/productos.txt');

    // Pruebas sin archivo
    console.log('Archivo vacio, getAll(): ', await contenedor.getAll());
    console.log('Archivo vacio, getById(4): ', await contenedor.getById(4));

    // Agregar productos
    console.log('Agregar producto', await contenedor.save({
        title: 'zapatilla',
        price: 15450.90,
        brand: 'Adidas'
    }));
    console.log('Agregar producto', await contenedor.save({
        title: 'Jeans',
        price: 30450.90,
        brand: 'Levis'
    }));
    console.log('Agregar producto', await contenedor.save({
        title: 'Remera',
        price: 3045.80,
        brand: 'Puma'
    }));

    // Pruebas archivo con registros
    console.log('Producto existente, getById(2): ', await contenedor.getById(2));
    console.log('Producto inexistente, getById(4): ', await contenedor.getById(4));
    console.log('Mostrar todos los productos', await contenedor.getAll());
    console.log('Eliminar 1 producto', await contenedor.deleteById(2));
    console.log('Mostrar todos los productos', await contenedor.getAll());

    // Pruebas vaciar al archivo
    console.log('Eliminar todos', await contenedor.deleteAll());
    console.log('Mostrar todos los productos', await contenedor.getAll());
}

main().then();




