import express from "express";
import os from 'os';
import compression from "compression";
import {renderInfo} from "../controllers/info.controller.js";
export const routerInfo = express.Router();

routerInfo.get('/', renderInfo);
routerInfo.get('/compressed', compression(),renderInfo);
