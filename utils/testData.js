import { getMaxCharacterCount } from '../API/rickAndMortyAPI.js';
import { selectRandomID } from './random.util.js';

const devName = 'Ihar Kapski';

async function getRandomID() {
    const maxID = await getMaxCharacterCount();
    return selectRandomID(maxID);
}

function collectData(person) {
    const personData =`Name: ${person.name}, Status: ${person.status}, Species: ${person.species}`;
    return personData;
}

function checkAlien(person) {
    if (person.species === 'Human') {
        return false;
    } else {
        return true;
    }
}

function getCurrentTimestamp() {
    const date = new Date();
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    const year = date.getFullYear();

    let hour = date.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    const dateTime = day + '.' + month + '.' + year + ' ' + hour + '.' + minute;
    return dateTime;
}

export { getRandomID, collectData, checkAlien, devName, getCurrentTimestamp };
