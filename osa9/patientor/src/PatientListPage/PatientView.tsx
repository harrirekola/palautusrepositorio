import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../types";
import { setDiagnosis, updatePatient, useStateValue } from "../state";
import { addViewPatient } from "../state";
import { useEffect } from "react";
import EntryDetails from "./EntryDetails";
import { Box, Button } from "@material-ui/core";
import { HospitalEntryFormValues } from "../AddEntryModal/PatientEntryForm";
import React from "react";
import AddEntryModal from "../AddEntryModal";

const PatientView = () => {

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HospitalEntryFormValues) => {
        const entryData = { ...values, type: 'Hospital'};
        try {
            const patient = id && patients[id] ? patients[id] : undefined;
            if(patient && id) {
                const { data: savedEntryData } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    entryData
                );
                patient.entries.push(savedEntryData);
                dispatch(updatePatient(patient));
            }
            closeModal();
        } catch(error) {
            console.log(error);
        }
    };

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
            <Box border={1}>
            {patient && patient?.entries?.map(entry => (
                <div key={entry.id}>
                    <EntryDetails entry={entry}/>
                </div>
            ))}
            </Box>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default PatientView;