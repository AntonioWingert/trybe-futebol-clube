import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();

router.get('/leaderboard', LeaderBoardController.getAll);

router.get('/leaderboard/home', LeaderBoardController.getHomeInfo);

router.get('/leaderboard/away', LeaderBoardController.getAwayInfo);

export default router;
