import os from "os";

export class InfoService {
    getInfo() {
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
}
