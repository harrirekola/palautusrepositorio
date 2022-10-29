import express from 'express';
import { Response, Request } from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send(patientService.getEntryWithoutSsn());
});

router.get('/:id', (req: Request, res: Response) => {
    const patients = patientService.getEntries();
    const id = req.params.id;
    const patient = patients.find(patient => patient.id === id);
    res.send(patient);
});


router.post('/', (req: Request, res: Response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
         if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req: Request, res: Response) => {
    try {
        const newEntry = toNewEntry(req.body);
        const id = req.params.id;
        const addedEntry = patientService.addedEntry(newEntry, id);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;