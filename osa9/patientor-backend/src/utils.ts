import { NewPatient, Gender, NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry, NewEntry, HealthCheckRating } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBrith(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        ssn: parseSsn(ssn),
        entries: []
    };

    return newEntry;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (str: unknown): string => {
    if(!str || !isString(str)) {
        throw new Error('Invalid or missing argument: ' + str);
    }
    return str;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseOccupation = (occupation: unknown) : string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseDateOfBrith = (dateOfBirth: unknown) : string => {
    if(!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }

    return dateOfBirth;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date) ) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown) : Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseSsn = (ssn: unknown) : string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (textArray: any[]): textArray is string[] => {    
    return !textArray.some((item) => {
        return !isString(item);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnoses = (diagnoses: any): string[] => {
    if(!Array.isArray(diagnoses) || !isStringArray(diagnoses)) {
        throw new Error('Invalid diagnosisCodes: ' + diagnoses);
    }
    return diagnoses;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if(!healthCheckRating || !Number.isInteger(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Invalid healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
    switch (object.type) {
        case 'Hospital':
            const newHospitalEntry: NewHospitalEntry = {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: 'Hospital',
                discharge: {
                    date: parseString(object.discharge.date),
                    criteria: parseString(object.discharge.criteria)
                },
                diagnosisCodes: parseDiagnoses(object.diagnosisCodes)
            };
            return newHospitalEntry;
        case 'OccupationalHealthcare':
            const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName),
                diagnosisCodes: parseDiagnoses(object.diagnosisCodes),
                sickLeave: object.sickLeave ? 
                    {
                        startDate: parseDate(object.sickLeave.startDate),
                        endDate: parseDate(object.sickLeave.endDate)
                    } : undefined
            };
            return newOccupationalHealthcareEntry;
        case 'HealthCheck':
            const newHealthCheckEntry: NewHealthCheckEntry = {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                diagnosisCodes: parseDiagnoses(object.diagnosisCodes)
            };
            return newHealthCheckEntry;
        default:
            throw new Error(`Unknown entry: ${JSON.stringify(object.type)}`);
    }
};