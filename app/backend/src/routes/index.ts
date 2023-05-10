import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';

const routes: Router = Router();

routes.use(TeamsRoutes);

export default routes;
