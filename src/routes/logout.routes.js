import express from "express";

export const routerLogout = express.Router();

routerLogout.get('/', async (req, res) => {
    const { email: username } = await req.user;
    req.session.destroy( err =>{
        res.render('logout', {username})
    })
});



