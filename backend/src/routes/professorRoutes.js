import { Router } from 'express';
import { validateProfessorCode } from '../controllers/professorController.js';

const router = Router();

router.post('/professor/validate', validateProfessorCode);

export default router;
