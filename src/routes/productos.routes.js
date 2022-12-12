import express from 'express';
import {createNewProduct, renderProductos, renderProductosTest} from "../controllers/productos.controller.js";



export const routerProductos = express.Router();

routerProductos.get('/', renderProductos);
routerProductos.post('/',  createNewProduct);
routerProductos.get('/test', renderProductosTest);
