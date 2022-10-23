import express from 'express';
export const routerChat = express.Router();


routerChat.get('/', async (req, res) => {
    const { email: username } = await req.user;
    res.render('chat', {username} )
})
