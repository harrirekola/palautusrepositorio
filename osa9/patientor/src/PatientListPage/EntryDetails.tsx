import { Entry, HealthCheckEntry  } from "../types";
import { useStateValue } from "../state";

const DetailedDiagnosis: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnosis },] = useStateValue();
    return (
        <>
            <div>diagnose by {entry.specialist}</div>
            { entry.diagnosisCodes && 
                <ul>
                {entry.diagnosisCodes.map((code, index) => (
                    <li key={index}>{code} {diagnosis && diagnosis[code] ? diagnosis[code].name : ''}</li>
                ))}
                </ul>
            }
        </>
    );
};

const HospitalEntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div>{entry.date} </div>
            <div>{entry.description}</div>
            <DetailedDiagnosis entry={entry} />
        </div>
    );
};

const OccupationalEntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <div>{entry.date}</div>
            <div>{entry.description}</div>
            <DetailedDiagnosis entry={entry} />
        </div>
    );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div>
            <div>{entry.date}</div>
            <div>{entry.description}</div>
            <DetailedDiagnosis entry={entry} />
        </div>
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled entry: ${JSON.stringify(value)}`);
    };

    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryDetails entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntryDetails entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
        }
};

export default EntryDetails;