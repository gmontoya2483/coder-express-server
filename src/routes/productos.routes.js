import express from 'express';
import {Contenedor} from "../Contenedor.js";
import {config} from "../utils/config.js";
import axios from "axios";


export const routerProductos = express.Router();

routerProductos.get('/', async (req, res) => {
    const contenedor = new Contenedor(config.stock_db, 'productos');
    const products = await contenedor.getAll();
    await contenedor.closeConnection()
    res.render('products', { products })
})

routerProductos.post('/', async (req, res) => {
    const contenedor = new Contenedor(config.stock_db, 'productos');
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
