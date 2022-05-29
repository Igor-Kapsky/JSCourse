import fs from 'fs';
import { getCurrentTimestamp } from '../utils/testData.js';
import { printError } from '../utils/printer.util.js'

function createLog(id) {
    fs.appendFile('hiddenAliens.txt', `${getCurrentTimestamp()} information about ${id} successfully hidden.\n`, err => {
        if (err) {
          printError(err);
        }
      });
}


export { createLog };
