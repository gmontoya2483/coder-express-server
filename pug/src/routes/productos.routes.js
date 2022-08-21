const express = require('express');
const routerProductos = express.Router();
const Contenerdor = require("../Contenedor");

const contenedor = new Contenerdor('./db_files/productos.txt')



routerProductos.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.render('products', { products })
})

routerProductos.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    await contenedor.create({title, price:priceFloat, thumbnail});
    res.redirect('/')
});



module.exports = routerProductos
