import TestData from "../testData.js";

export default class AlienHider {
    checkAlien(person) {
        return person.species === 'Human';
    }
    
    hideInfo(person) {
        const testData = new TestData();
        person.name = testData.devName;
        person.species = person.species.replace(/[A-Za-z ]/g, '*');;
        return person;
    }
}
