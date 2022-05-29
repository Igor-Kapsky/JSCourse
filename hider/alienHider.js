import { devName } from "../utils/testData.js";

function hideInfo(person) {
    person.name = devName;
    person.species = person.species.replace(/[A-Za-z]/g, '*');;
    return person;
}

export { hideInfo };
