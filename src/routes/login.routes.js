import express from "express";
export const routerLogin = express.Router();
import passport from '../utils/passport.js';
import {renderLogin, renderLoginError} from "../controllers/login.controller.js";



routerLogin.get('/', renderLogin);
routerLogin.get('/error', renderLoginError);
routerLogin.post('/', passport.authenticate('local',  {successRedirect: '/productos', failureRedirect: '/login/error'} ));
