import { v1 as uuid } from 'uuid';

import { PublicPatient, NewPatient, Patient } from '../types';
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


const getEntries = () => {
    return patientEntries;
};

export default {
    getEntryWithoutSsn,
    addPatient,
    getEntries
};