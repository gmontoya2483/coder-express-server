
import {RandomService} from "../services/random.service.js";
const randomService = new RandomService();

export const generateRandomNumbers = (req, res) => {
    const cant = (req.query.cant) ? parseInt(req.query.cant)  : 100000000;
    return randomService.generateRandomNumbers(res,cant);
}
