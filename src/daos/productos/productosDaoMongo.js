import {ContenedorMongo} from "../../contenedores/contenedorMongo.js";
import {Producto} from "../../models/producto.model.js";

export default class ProductosDaoMongo extends ContenedorMongo {
    constructor() {
        super(Producto);
    }
}
