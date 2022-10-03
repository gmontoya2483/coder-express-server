import {ContenedorKnex} from "../../contenedores/contenedorKnex.js";
import {config} from "../../utils/config.js";

export default class ChatsDaoKnex extends ContenedorKnex {
    constructor() {
        super(config.chat_db, 'mensajes');
    }
}
