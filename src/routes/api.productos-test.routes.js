import express  from 'express';
import {generate_x_randomProducts} from "../utils/randomProducts.js";

export const routerApiProductosTest = express.Router();

routerApiProductosTest.get('/', async (req, res) => {
    return res.json(generate_x_randomProducts(5))
})
