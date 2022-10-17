import patients from '../../data/patients.json';

import { EntryWithoutSocial } from '../types';

const getEntryWithoutSsn = (): EntryWithoutSocial[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntryWithoutSsn
};