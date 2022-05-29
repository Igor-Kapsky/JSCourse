import axios from 'axios';
import config from '../config.json' assert {type: "json"};

async function getCharacterByID(id) {
    const result = await axios.get(`${config.baseURL}`+`${id}`);
    return result.data;
}

async function getMaxCharacterCount() {
    const result = await axios.get(config.baseURL);
    return result.data.info.count;
}

export { getMaxCharacterCount, getCharacterByID };
