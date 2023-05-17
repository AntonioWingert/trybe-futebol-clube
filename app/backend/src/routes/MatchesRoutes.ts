import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.get('/matches', MatchesController.getAll);

router.post(
  '/matches',
  validateToken,
  MatchesController.create,
);

router.patch(
  '/matches/:id',
  validateToken,
  MatchesController.updateGoals,
);

router.patch(
  '/matches/:id/finish',
  validateToken,
  MatchesController.updateFinish,
);

export default router;
