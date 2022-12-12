
import {ProductosService} from "../services/productos.service.js";
import {config} from "../utils/config.js";
import axios from "axios";
const productoService = new ProductosService();

export const renderProductos = async (req, res) => {
    const { email: username } = await req.user;
    const products = await productoService.getAllProducts();
    res.render('products', { products, username })
};


export const renderNuevoProducto = async (req, res) => {
    const { email: username } = await req.user;
    const products = await productoService.getAllProducts();
    res.render('new-product', { products, username });
}



export const renderProductosTest = async (req, res) => {
    const { email: username } = await req.user;
    const url = `${config.axios.baseUrl}/api/productos-test`
    const {data: products} = await axios.get(url);
    res.render('products-test', { products, username });
};


export const createNewProduct = async (req, res) => {
    const newProduct = await  productoService.newProduct(req.body);
    res.redirect('/')
};
