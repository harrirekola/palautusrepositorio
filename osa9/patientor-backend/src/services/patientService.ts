import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { PublicPatient, NewPatient, Patient, Entry, NewEntry } from '../types';
import patientEntries from '../../data/patients';

const getEntryWithoutSsn = (): PublicPatient[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};


const addPatient = ( entry: NewPatient ): Patient => {

    const newPatient = {
        id: uuid(),
        ...entry
    };

    patientEntries.push(newPatient);
    return newPatient;
};


const addedEntry = (entry: NewEntry, id: string): Entry => {

    const newEntry = {
        ...entry,
        id: uuid(),
    };

    const patientIndex = patients.findIndex((p => p.id === id));
    patients[patientIndex].entries.push(newEntry);
    return newEntry;

};

const getEntries = () => {
    return patientEntries;
};

export default {
    getEntryWithoutSsn,
    addPatient,
    getEntries,
    addedEntry
};