import {ContenedorMongo} from "../../contenedores/contenedorMongo.js";
import {Usuario} from "../../models/user.model.js";

export default class UsuariosDaoMongo extends ContenedorMongo {
    constructor() {
        super(Usuario);
    }
}
