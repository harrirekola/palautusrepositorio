import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect } from "react";
import { useStateValue } from "../state";
import { addViewPatient } from "../state";

const PatientView = () => {

    const [{ patients }, dispatch] = useStateValue();
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
        void fetchPatient();        
    }, [dispatch]);

    if (id == undefined || patients[id] == undefined) {
        return (
          <div>error</div>
        );
    }
    const patient = (patients[id]);

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
    );
};

export default PatientView;