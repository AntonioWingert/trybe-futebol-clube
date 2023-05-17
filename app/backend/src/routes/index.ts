import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';
import LoginRoutes from './LoginRoutes';
import MatchesRoutes from './MatchesRoutes';

const routes: Router = Router();

routes.use(TeamsRoutes);
routes.use(LoginRoutes);
routes.use(MatchesRoutes);

export default routes;
