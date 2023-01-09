import {ProductosService} from "../services/productos.service.js";
const productoService = new ProductosService();


export const obtenerProductos = async () => {
    return await productoService.getAllProducts();
}
