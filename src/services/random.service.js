import {fork} from "child_process";

export class RandomService {

    generateRandomNumbers(res, cant) {
        const forkedProcess = fork('./src/services/generateRandomsNumbers.js');
        forkedProcess.send(cant);
        forkedProcess.on('message', response => {
            return res.json(response);
        });
    }

}
