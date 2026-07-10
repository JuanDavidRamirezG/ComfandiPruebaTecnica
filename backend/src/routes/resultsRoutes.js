import { Router } from 'express';
import { getResults } from '../controllers/resultsController.js';

const router = Router();

router.get('/results', getResults);

export default router;
