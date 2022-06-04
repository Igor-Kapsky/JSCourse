import RickAndMortyAPI from '../API/rickAndMortyAPI.js';



export default class RandomUtil {

  async selectRandomID(min = 1) {  
    const rickAndMortyAPI = new RickAndMortyAPI();
    const max = await rickAndMortyAPI.getMaxCharacterCount();
    min = Math.ceil(min);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
}