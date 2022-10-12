import express from "express";

export const routerLogin = express.Router();

routerLogin.get('/', (req, res) => {
    return res.render('login')
});


routerLogin.post('/', (req, res)=> {
    const { username } = req.body;
    req.session.username = username
    res.redirect('/productos');
});
