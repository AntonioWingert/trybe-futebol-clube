import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';
import LoginRoutes from './LoginRoutes';

const routes: Router = Router();

routes.use(TeamsRoutes);
routes.use(LoginRoutes);

export default routes;
