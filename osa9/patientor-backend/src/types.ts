export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}

export type EntryWithoutSocial = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}