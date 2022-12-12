import express from "express";
import {renderLogout} from "../controllers/logout.controller.js";

export const routerLogout = express.Router();

routerLogout.get('/', renderLogout);



