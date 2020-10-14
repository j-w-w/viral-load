import { uniqueNamesGenerator, names, animals } from "unique-names-generator"
import { getHoursBetweenDates, getDateKey } from "./timeUtil";

const createName = () => {
    const randomName = uniqueNamesGenerator({
        dictionaries: [names, animals],
        separator: ' ',
        style: 'capital'
    });

    return randomName;
}

const searchDictionary = (d, searchPredicate) => {
    return Object.fromEntries(Object.entries(d).filter(([k , v]) => searchPredicate(k,v)));
}

const searchInteractions = (d, personId) => {
    return searchDictionary(d, (personKey, interactors) => {
        return personKey === personId || interactors.filter(x => x === personId).length > 0;
    });
}

const filterNewName = (people, newName) => {
    return searchDictionary(people, (k,v) => v === newName);
}

//fix parameter typings
export function generateData(personCount, startDate, endDate){
    let data = {
        people: {},
        interactions: {},
        flatInteractions: {}
    }

    //generate people / ids
    for(let i = 0; i < personCount; i++){
        let newName = null;

        //generate a new random name that doesn't already exist in the set
        while(newName === null){
            newName = createName();

            if(Object.keys(filterNewName(data.people, newName)).length > 0){
                newName = null;
            }
        }

        data.people[i] = newName;
    }

    //generate list of unix-represented hours between the start and end date
    const hoursBetween = getHoursBetweenDates(startDate, endDate);

    /*
        loop through people;
        assign them random one-hour interactions with sets of up to all other people;
        do not duplicate assignments in a one-hour period
        build a dictionary; key on ids -> {period, id set},
    */
    for(let [personKey] of Object.entries(data.people)){
        let hoursChecked = 0;
        let keepTrying;

        do {
            keepTrying = false;
            hoursChecked++;

            //get a random date key between start and end to correspond with this interaction set
            //where the current person does not already have an interaction in that range
            let randomHour = Math.floor(Math.random() * hoursBetween)
            let newDateKey = getDateKey(startDate, randomHour);

            //create a new dateKey if none exists
            if(!data.interactions.newDateKey){
                data.interactions[newDateKey] = {};
            }

            let filtered = [];

            //if this personId isn't already associated with this dateKey directly or through another person, add this personId and a corresponding array
            if(!data.interactions[newDateKey][personKey]) {
                filtered = searchInteractions(data.interactions[newDateKey], personKey);

                if(Object.keys(filtered).length === 0) {
                    data.interactions[newDateKey][personKey] = [];

                    if(!data.flatInteractions[personKey]){
                        data.flatInteractions[personKey] = [];
                    }

                    data.flatInteractions[personKey].push(newDateKey);
                }
                //else move on to another date key if one exists
                else {
                    keepTrying = true;
                    break;
                }
            }

            //if we get this far, this was a valid new interaction set for this personId
            //exclude conflicting personIds
            let possibleInteractors = Object.keys(data.people).filter(p =>
                Object.keys(data.interactions[newDateKey]).filter(i =>
                    i === p || Object.values(data.interactions[newDateKey]).filter(q =>
                        Object.values(q).filter(r =>
                            r === p
                        ).length === 0
                    ).length === 0
                ).length === 0
            )

            //get a random number of possible interactions for this individual
            let randomInteractionCount = Math.floor(Math.random() * possibleInteractors.length)

            for(let n = 0; n < randomInteractionCount; n++){
                let randomInteractor = possibleInteractors[Math.floor(Math.random() * possibleInteractors.length)];

                data.interactions[newDateKey][personKey].push(randomInteractor)

                if(!data.flatInteractions[randomInteractor]){
                    data.flatInteractions[randomInteractor] = [];
                }

                data.flatInteractions[randomInteractor].push(newDateKey);
            }

        } while(hoursChecked < hoursBetween && keepTrying)
    }

    return data;
}