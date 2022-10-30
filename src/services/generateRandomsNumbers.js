import {getRandomInt} from "../utils/random.js";

process.on('message', cant => {
    let randomNumbers = {};
    for( let i = 0; i < cant; i++) {
        const randomNumber = getRandomInt(1, 1000).toString();
        if(!randomNumbers[randomNumber]) {
            randomNumbers[randomNumber] = 1
        } else {
            randomNumbers[randomNumber] = randomNumbers[randomNumber] + 1;
        }
    }
    process.send(randomNumbers);
});



