import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import voterRoutes from './voterRoutes.js';
import professorRoutes from './professorRoutes.js';
import candidateRoutes from './candidateRoutes.js';
import voteRoutes from './voteRoutes.js';
import resultsRoutes from './resultsRoutes.js';

const router = Router();

router.use(healthRoutes);
router.use(voterRoutes);
router.use(professorRoutes);
router.use(candidateRoutes);
router.use(voteRoutes);
router.use(resultsRoutes);

export default router;
