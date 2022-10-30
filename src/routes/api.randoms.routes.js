import express from "express";
import {fork} from 'child_process';

export const routerApiRandoms = express.Router();


routerApiRandoms.get('/', async (req, resp)=> {
    const forkedProcess = fork('./src/services/generateRandomsNumbers.js');
    const cant = (req.query.cant) ? parseInt(req.query.cant)  : 100000000;
    forkedProcess.send(cant);
    forkedProcess.on('message', response => {
        return resp.json(response);
    });
})