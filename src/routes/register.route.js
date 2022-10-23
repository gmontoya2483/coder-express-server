import express from "express";
import {generateHashPassword, validateHash} from "../utils/security.js";
import {UsuariosDao} from "../daos/index.js";

export const routerRegister = express.Router();

const contenedor = new UsuariosDao();

routerRegister.get('/', (req, res) => {
    return res.render('register')
});


routerRegister.post('/', async (req, res)=> {
    const { username } = req.body;
    const { password } = req.body;
    const hashedPassword = await generateHashPassword(password);
    await contenedor.create({email: username, password: hashedPassword});
    res.redirect('/login');
});
