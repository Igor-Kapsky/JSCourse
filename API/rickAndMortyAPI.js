import axios from 'axios';
import config from '../config.js';

export default class RickAndMortyAPI {
    async getCharacterByID(id) {
        const result = await axios.get(`${config.baseURL}${id}`);
        return result.data;
    }
    
    async getMaxCharacterCount() {
        const result = await axios.get(config.baseURL);
        return result.data.info.count;
    }
}
