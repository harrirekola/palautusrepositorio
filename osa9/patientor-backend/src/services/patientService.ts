import patients from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { EntryWithoutSocial, PatientEntry, NewPatientEntry } from '../types';

const getEntryWithoutSsn = (): EntryWithoutSocial[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {

    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntryWithoutSsn,
    addPatient
};