import { Router } from 'express';
import validateTeam from '../middlewares/validateTeam';
import TeamsController from '../controllers/TeamsController';

const router = Router();

router.get('/teams', TeamsController.getAll);
router.get('/teams/:id', validateTeam, TeamsController.getById);

export default router;
