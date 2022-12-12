import express  from 'express';
import {generate_x_randomProducts} from "../utils/randomProducts.js";
import {getProductTest} from "../controllers/api.productos-test.controller.js";

export const routerApiProductosTest = express.Router();

routerApiProductosTest.get('/', getProductTest)
