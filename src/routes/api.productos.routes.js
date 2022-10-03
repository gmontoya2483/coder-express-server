import express  from 'express';
import { ContenedorKnex } from "../contenedores/contenedorKnex.js";
import {config} from "../utils/config.js";
import ProductosDaoKnex from "../daos/productos/productosDaoKnex.js";

export const routerApiProductos = express.Router();

routerApiProductos.get('/', async (req, resp)=> {
    // const contenedor = new ContenedorKnex(config.stock_db, 'productos');
    const contenedor = new ProductosDaoKnex();
    const productos = await contenedor.getAll();
    await contenedor.closeConnection();
    resp.json(productos);
});

routerApiProductos.get('/:id', async (req, resp)=> {
    const contenedor = new ProductosDaoKnex();
    const [user,] = await contenedor.getById(req.params.id);
    await contenedor.closeConnection();
    return (user)
        ? resp.status(200).json(user)
        : resp.status(404).json({error: 'producto no encontrado'});
});

routerApiProductos.delete('/:id', async(req, resp) => {
    const id = +req.params.id;
    const contenedor = new ProductosDaoKnex();
    const deletedId = await contenedor.deleteById(id);
    await contenedor.closeConnection();
    return (deletedId !== 0)
        ? resp.status(200).json({ 'deletedId': id })
        : resp.status(404).json({ error: 'producto no encontrado' });
});

routerApiProductos.post('/', async( req, resp) => {
    const contenedor = new ProductosDaoKnex();
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    const [newProductoId,] = await contenedor.create({title, price:priceFloat, thumbnail});
    await contenedor.closeConnection();
    return resp.status(201).json({'id': newProductoId, title, price, thumbnail});
});

routerApiProductos.put('/:id', async( req, resp) => {
    const id = +req.params.id;
    const contenedor = new ProductosDaoKnex();
    const { title, price, thumbnail } = req.body;
    const priceFloat = parseFloat(price);
    const data = {id, title, price:priceFloat, thumbnail }
    const updatedProducto = await (contenedor.update(data));
    await contenedor.closeConnection();
    return (updatedProducto !== 0)
        ?  resp.status(200).json(data)
        : resp.status(404).json({ error: 'producto no encontrado' });
});
