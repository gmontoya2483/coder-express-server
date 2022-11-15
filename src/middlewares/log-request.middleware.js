import {logger} from "../utils/logger.js";

export const LogRequest = (req, res, next) => {
    logger.info(`Ruta ${req.originalUrl}, método ${req.method}`)
    next();
}
