import express from 'express';
import {renderChat} from "../controllers/chat.controller.js";
export const routerChat = express.Router();


routerChat.get('/', renderChat);
