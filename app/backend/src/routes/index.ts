import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';
import LoginRoutes from './LoginRoutes';
import MatchesRoutes from './MatchesRoutes';
import LeaderBoardRoutes from './LeaderBoardRoutes';

const routes: Router = Router();

routes.use(TeamsRoutes);
routes.use(LoginRoutes);
routes.use(LeaderBoardRoutes);
routes.use(MatchesRoutes);

export default routes;
