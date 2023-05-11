import * as Joi from 'joi';
import { IUser } from '../types/IUser';

const loginSchema = Joi.object<IUser>().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default loginSchema;
