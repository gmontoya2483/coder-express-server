import express from "express";
import {fork} from 'child_process';
import {generateRandomNumbers} from "../controllers/api.randoms.controller.js";

export const routerApiRandoms = express.Router();


routerApiRandoms.get('/', generateRandomNumbers);
