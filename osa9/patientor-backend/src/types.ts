export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type EntryWithoutSocial = Omit<Patient, 'ssn'>;

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}


export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface Discharge {
    date: string,
    criteria: string
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: Discharge
}

interface SickLeave {
    startDate: string,
    endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeave

}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewEntry =
    | NewHealthCheckEntry
    | NewOccupationalHealthcareEntry
    | NewHospitalEntry ;