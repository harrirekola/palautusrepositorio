import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import { setDiagnosis, useStateValue } from "../state";
import { addViewPatient } from "../state";
import { useEffect } from "react";

const PatientView = () => {

    const [{ patients, diagnosis }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string}>();

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) {
                throw new Error("Incorrect ID");
            }
            try {
                const { data: patientFromApi} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(addViewPatient(patientFromApi));
            } catch (error) {
                console.log(error);
            }
        };
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnoses } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosis(diagnoses));
            } catch (error) {
                console.log(error);
            }
        };
        void fetchPatient();
        void fetchDiagnoses(); 
    }, [dispatch]);

    if (id == undefined || patients[id] == undefined || diagnosis == undefined) {
        return (
          <div>error</div>
        );
    }

    const patient = patients[id];
    return (
        <div>
            <h2>{patient?.name}</h2>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <b>entries</b>
            {patient && patient?.entries?.map(entry => (
                <div key={entry.id}>
                    <div>{entry.date} {entry.description}</div>
                    <ul>
                    {entry.diagnosisCodes && entry.diagnosisCodes.map((code,index) => (
                        <li key={index}>{code} {diagnosis && diagnosis[code] ? diagnosis[code].name : ''}</li>
                    ))}
                    </ul>
                </div>
            ))}

        </div>
    );
};

export default PatientView;