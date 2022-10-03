import express from 'express';
import {config} from "../utils/config.js";
import axios from "axios";
import { ProductosDao } from "../daos/index.js"



export const routerProductos = express.Router();

routerProductos.get('/', async (req, res) => {
    const contenedor = new ProductosDao();
    const products = await contenedor.getAll();
    await contenedor.closeConnection()
    res.render('products', { products })
})

routerProductos.post('/', async (req, res) => {
    const contenedor = new ProductosDao();
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    await contenedor.create({title, price:priceFloat, thumbnail});
    await contenedor.closeConnection();
    res.redirect('/')
});

routerProductos.get('/test', async(req, res)=> {
    const url = `${config.axios.baseUrl}/api/productos-test`
    const {data: products} = await axios.get(url);
    res.render('products-test', { products })
});
