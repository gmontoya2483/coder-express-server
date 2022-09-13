import express from 'express';
export const routerChat = express.Router();


routerChat.get('/', async (req, res) => {
    res.render('chat' )
})
