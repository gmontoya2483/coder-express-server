import {ContenedorArchivo} from "../../contenedores/contenedorArchivo.js";

export default class ChatsDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('./DB/mensajes.txt');
    }
}
