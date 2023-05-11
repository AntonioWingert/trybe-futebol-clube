import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post('/login', validateLogin, LoginController.login);
router.get('/login/role', validateToken, LoginController.getRole);

export default router;
