import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import { setDiagnosis, useStateValue } from "../state";
import { addViewPatient } from "../state";
import { useEffect } from "react";
import EntryDetails from "./EntryDetails";
import { Box } from "@material-ui/core";

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
            <Box sx={{ border: 1 }}>
            {patient && patient?.entries?.map(entry => (
                <div key={entry.id}>
                    <EntryDetails entry={entry}/>
                </div>
            ))}
            </Box>
        </div>
    );
};

export default PatientView;