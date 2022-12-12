import {ProductosService} from "../services/productos.service.js";
const productoService = new ProductosService();

export const getAllProductos = async (req, res ) => {
    try {
        const productos = await productoService.getAllProducts();
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            error: error.message
        });
    }

}

export const getProductById = async (req, res) => {
    try {
        const user = await productoService.getProductById(req.params.id);
        return (user)
            ? res.status(200).json(user)
            : res.status(404).json({error: 'producto no encontrado'});

    } catch (error) {
        return res.status(500).json({
            status: 500,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            error: error.message
        });
    }
    
}


export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await  productoService.deleteProduct(req.params.id);
        return (!deletedProduct)
            ? res.status(404).json({ error: 'producto no encontrado' })
            : res.status(200).json({'deletedId': req.params.id });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            error: error.message
        });
    }
}


export const newProduct = async (req, res) => {
    try {
        const newProduct = await  productoService.newProduct(req.body);
        return res.status(201).json(newProduct);

    } catch (error) {
        return res.status(500).json({
            status: 500,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            error: error.message
        });
    }
}


export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await  productoService.updateProduct(req.params.id, req.body);
        return (!updatedProduct)
            ? res.status(404).json({ error: 'producto no encontrado' })
            : res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({
            status: 500,
            route: `${req.method} ${req.baseUrl} ${req.url}`,
            error: error.message
        });
    }
}
