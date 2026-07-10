import { Router } from 'express';
import { registerVote } from '../controllers/voterController.js';

const router = Router();

router.post('/vote', registerVote);

export default router;
