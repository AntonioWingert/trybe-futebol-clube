import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import loginValidations from '../middlewares/loginValidations';
import LoginController from '../controllers/LoginController';

const router = Router();

router.post(
  '/login',
  loginValidations.validateFields,
  loginValidations.validateEmail,
  LoginController.login,
);
router.get('/login/role', validateToken, LoginController.getRole);

export default router;
