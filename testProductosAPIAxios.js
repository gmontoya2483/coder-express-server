import axios from 'axios';
import { writeFile } from "fs";
import {logger} from "./src/utils/logger.js";
import {config} from "./src/utils/config.js";


const baseUrl = `${config.axios.baseUrl}/api/productos`;


const getAllProducts = async () => {
    const res = await axios.get(`${baseUrl}`);
    return res.data;
};

const getProductById = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
};

const insertProduct = async (producto) => {
    const res = await axios.post(`${baseUrl}`, producto);
    return res.data;
};

const updateProductById = async (productId, producto) => {
    const res = await axios.put(`${baseUrl}/${productId}`, producto);
    return res.data;
};
const deleteProductById = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res.data;
};





async function escribirResumen(archivo, datos){
    writeFile(archivo, JSON.stringify(datos, null, '\t'), error => {
        if (error) throw new Error(`Error de escritura de archivo ${archivo}`);
        logger.info(`Escritura ok de archivo ${archivo}`);
    })
}


const test = async  () => {
    const archivo = "resumen-test-axios.json";

    try {
        const insertProductResult = await insertProduct({
            "title": "test",
            "price": 23.45,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        });
        const getAllProductsResult = await getAllProducts();
        const updateProductByIdResult = await updateProductById(insertProductResult._id, {
            "title": "updated test",
            "price": 13.45,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        })
        const getProductByIdResult = await getProductById(insertProductResult._id);
        const deleteProductByIdResult = await deleteProductById(insertProductResult._id);






        await escribirResumen(archivo, {
            insertProductResult,
            getAllProductsResult,
            updateProductByIdResult,
            getProductByIdResult,
            deleteProductByIdResult
        });

    } catch (err) {
        logger.error(err);
    }
}

await test();


