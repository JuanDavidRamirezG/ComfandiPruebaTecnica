import { Router } from 'express';
import { editVoterName, getVoters, registerVoter, removeVoter } from '../controllers/voterController.js';

const router = Router();

router.get('/voters', getVoters);
router.post('/voters', registerVoter);
router.put('/voters/:id', editVoterName);
router.delete('/voters/:id', removeVoter);

export default router;
