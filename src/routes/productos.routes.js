const express = require('express');
const Contenerdor = require("../Contenedor");
const routerProductos = express.Router();

const contenedor = new Contenerdor('./db_files/productos.txt');

routerProductos.get('/', async (req, resp)=> {
    resp.send(await contenedor.getAll());
});

routerProductos.get('/:id', async (req, resp)=> {
    const user = await contenedor.getById(req.params.id);
    return (user)
        ? resp.status(200).json(user)
        : resp.status(404).json({error: 'producto no encontrado'});
});

routerProductos.delete('/:id', async(req, resp) => {
    const deletedId = await contenedor.deleteById(req.params.id);
    return (deletedId !== -1)
        ? resp.status(200).json({ deletedId })
        : resp.status(404).json({ error: 'producto no encontrado' });
});

routerProductos.post('/', async( req, resp) => {
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    const newProducto = await (contenedor.create({title, price:priceFloat, thumbnail}));
    return resp.status(201).json(newProducto);
});

routerProductos.put('/:id', async( req, resp) => {
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    const updatedProducto = await (contenedor.update({
        id: parseInt(req.params.id),
        title,
        price:priceFloat,
        thumbnail
    }));
    return (updatedProducto !== -1)
        ?  resp.status(200).json(updatedProducto)
        : resp.status(404).json({ error: 'producto no encontrado' });
});

module.exports = routerProductos
