import express from 'express';
import { Response, Request } from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send(diagnoseService.getEntries());
});

export default router;