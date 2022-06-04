import dateFormat from "dateformat";

export default class HelperUtil {
     getCurrentTimestamp() {
        return dateFormat(new Date(), "dd.mm.yyyy hh.MM");
}

    collectData(person) {
        const personData =`Name: ${person.name}, Status: ${person.status}, Species: ${person.species}`;
        return personData;
}
}
