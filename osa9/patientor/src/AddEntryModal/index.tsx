import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PatientEntryForm from "./PatientEntryForm";
import { HospitalEntryFormValues } from "./PatientEntryForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryFormValues) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <PatientEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;