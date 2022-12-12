import {UsuariosDao} from "../daos/index.js";

export class UsuarioService {
    constructor() {
        this.contenedor = new UsuariosDao();
    }

    async getUserByUserName(username) {
        return await this.contenedor.getByEmail(username);
    }
}
