import {ContenedorKnex} from "../../contenedores/contenedorKnex.js";
import {config} from "../../utils/config.js";

export default class ProductosDaoKnex extends ContenedorKnex {
    constructor() {
        super(config.stock_db, 'productos');
    }
}
