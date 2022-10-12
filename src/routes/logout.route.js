import express from "express";

export const routerLogout = express.Router();

routerLogout.get('/', (req, res) => {
    const username = req.session.username
    req.session.destroy( err =>{
        res.render('logout', {username})
    })
});



