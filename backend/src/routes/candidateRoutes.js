import { Router } from 'express';
import {
  addCandidate,
  editCandidate,
  getCandidates,
  removeCandidate
} from '../controllers/candidateController.js';

const router = Router();

router.get('/candidates', getCandidates);
router.post('/candidates', addCandidate);
router.put('/candidates/:id', editCandidate);
router.delete('/candidates/:id', removeCandidate);

export default router;
