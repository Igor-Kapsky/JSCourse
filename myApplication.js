import Printer from './utils/printer.util.js';
import RickAndMortyAPI from './API/rickAndMortyAPI.js';
import HelperUtil from './utils/helper.util.js';
import AlienHider from './hider/alienHider.js';
import HideLogger from './hider/hideLogger.js';
import RandomUtil from './utils/random.util.js';

export default class MyApplication {
    async myApplication(id) {
        id = Math.round(id);
        const randomUtil = new RandomUtil();
        const printer = new Printer();
        const helperUtil = new HelperUtil();
        const hideLogger = new HideLogger();
        const alienHider = new AlienHider();
        const rickAndMortyAPI = new RickAndMortyAPI();
    
        const maxID = await rickAndMortyAPI.getMaxCharacterCount();
        const moreThanMax = num => num > maxID && num;
        const lessThanOne = num => num <= 0 && num;
    
        switch (id) {
            case moreThanMax(id):
                printer.printError(`Please use ID less than ${maxID}`);
                break;
            case lessThanOne(id):
                printer.printError(`Please use ID bigger than 0`);
                break;
            default:
                {
                    let character;
                    let personInfo;
                    if (id) {
                        character = await rickAndMortyAPI.getCharacterByID(id);
                    } else {
                        id = await randomUtil.selectRandomID();
                        character = await rickAndMortyAPI.getCharacterByID(id);
                    }
                    if (!alienHider.checkAlien(character)) {
                        character = alienHider.hideInfo(character);
                        hideLogger.createLog(id);
                    }
                    personInfo = helperUtil.collectData(character);
                    printer.printInfo(personInfo);
                }
          }    
    }
}