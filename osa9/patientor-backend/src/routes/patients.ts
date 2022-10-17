import express from 'express';
import { Response, Request } from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send(patientService.getEntryWithoutSsn());
});

export default router;