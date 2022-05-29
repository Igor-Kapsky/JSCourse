import { printInfo, printError } from './utils/printer.util.js';
import { getCharacterByID, getMaxCharacterCount } from './API/rickAndMortyAPI.js';
import { getRandomID, collectData, checkAlien } from './utils/testData.js';
import { hideInfo } from './hider/alienHider.js';
import { createLog } from './hider/hideLogger.js'



async function myApplication(id) {
    id = Math.round(id);
    const maxID = await getMaxCharacterCount()
    if (id > maxID) {
        printError(`Please use ID less than ${maxID}`);
    } else if (id <= 0) {
        printError(`Please use ID bigger than 0`);
    } else {
        let character;
        let personInfo;
        if (id) {
            character = await getCharacterByID(id);
        } else {
            id = await getRandomID();
            character = await getCharacterByID(id);
        }
    if (checkAlien(character)) {
        hideInfo(character);
        createLog(id);
    }
    personInfo = collectData(character);
    printInfo(personInfo);
    }
    
}

myApplication();
