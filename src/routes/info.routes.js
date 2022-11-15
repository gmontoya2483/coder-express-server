import express from "express";
import os from 'os';
import compression from "compression";
export const routerInfo = express.Router();

routerInfo.get('/', async (req, res) => {
    const { email: username } = await req.user;
    const info = getInfo();
    return res.render('info', {info, username});
});

routerInfo.get('/compressed', compression(), async (req, res) => {
    const { email: username } = await req.user;
    const info = getInfo();
    return res.render('info', {info, username});
});


const getInfo = () => {
    return {
        args: process.argv,
        platform: process.platform,
        pid: process.pid,
        path: process.cwd(),
        execPath: process.execPath,
        nodeVersion: process.version,
        reservedMemory: process.memoryUsage.rss(),
        cpus: os.cpus().length
    }

}
