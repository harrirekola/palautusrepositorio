import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    | {
      type: "VIEW_PATIENT";
      payload: Patient;
    } 
    | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "VIEW_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS":
        return {
            ...state,
            diagnosis: {
                ...action.payload.reduce(
                    (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose}),
                    {}
                ),
                ...state.diagnosis
            }
        };
    default:
      return state;
    
  }
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};

export const createPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};

export const addViewPatient = (payload: Patient): Action => {
  return {
    type: "VIEW_PATIENT",
    payload
  };
};

export const setDiagnosis = (diagnoses: Diagnosis[]): Action => {
  return {
      type: "SET_DIAGNOSIS",
      payload: diagnoses
  };
};