import { ProductosDao } from "../daos/index.js";

export class ProductosService {

    constructor() {
        this.contenedor = new ProductosDao();
    }


    async getAllProducts() {
        return  await this.contenedor.getAll();
    }

    async getProductById(id) {
        return  await this.contenedor.getById(id);
    }

    async deleteProduct(id) {
        return await this.contenedor.deleteById(id);
    }

    async newProduct({title, price, thumbnail}) {
        const priceFloat = parseFloat(price);
        return await this.contenedor.create({title, price:priceFloat, thumbnail});
    }


    async updateProduct(id, { title, price, thumbnail }){
        const priceFloat = parseFloat(price);
        const data = {id, title, price:priceFloat, thumbnail }
        return  await this.contenedor.update(data);
    }


}
