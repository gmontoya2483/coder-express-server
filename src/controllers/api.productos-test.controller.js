import {ProductosService} from "../services/productos.service.js";
const productoService = new ProductosService();

export const getProductTest = (req, res) => {
    return res.status(200).json(productoService.getFakeProducts());
}
