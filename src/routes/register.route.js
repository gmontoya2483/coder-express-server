import express from "express";
import {generateHashPassword, validateHash} from "../utils/security.js";
import {UsuariosDao} from "../daos/index.js";

export const routerRegister = express.Router();

const contenedor = new UsuariosDao();

routerRegister.get('/', (req, res) => {
    return res.render('register')
});

routerRegister.get('/error', (req, res) => {
    return res.render('register-error');
});


routerRegister.post('/', async (req, res)=> {
    const { username } = req.body;
    const { password } = req.body;

    const user = await contenedor.getByEmail(username);
    if (user)
        return res.redirect('/register/error');

    const hashedPassword = await generateHashPassword(password);
    await contenedor.create({email: username, password: hashedPassword});
    res.redirect('/login');
});
