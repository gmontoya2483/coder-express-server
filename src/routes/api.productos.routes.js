import express  from 'express';

import {
    deleteProduct,
    getAllProductos,
    getProductById,
    newProduct,
    updateProduct
} from "../controllers/api.productos.controller.js";

export const routerApiProductos = express.Router();


routerApiProductos.get('/', getAllProductos);
routerApiProductos.get('/:id', getProductById);
routerApiProductos.delete('/:id', deleteProduct);
routerApiProductos.post('/', newProduct);
routerApiProductos.put('/:id', updateProduct);
