import express from 'express';
import { Response, Request } from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send(patientService.getEntryWithoutSsn());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    const newPatientEntry = patientService.addPatient({
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn
    });
    res.json(newPatientEntry);
});

export default router;