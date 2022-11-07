import express from "express";
import os from 'os';
export const routerInfo = express.Router();

routerInfo.get('/', async (req, res) => {
    const { email: username } = await req.user;
    const info = {
        args: process.argv,
        platform: process.platform,
        pid: process.pid,
        path: process.cwd(),
        execPath: process.execPath,
        nodeVersion: process.version,
        reservedMemory: process.memoryUsage.rss(),
        cpus: os.cpus().length
    }
    return res.render('info', {info, username});
});
