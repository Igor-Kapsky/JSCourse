import fs from 'fs';
import HelperUtil from '../utils/helper.util.js';
import Printer from '../utils/printer.util.js';
import config from '../config.js';

export default class HideLogger {
  createLog(id) {
    const printer = new Printer();
    const helperUtil = new HelperUtil();
      fs.appendFile(config.fileName, `${helperUtil.getCurrentTimestamp()} information about ${id} successfully hidden.\n`, err => {
          if (err) {
            printer.printError(err);
          }
        });
  }
}
