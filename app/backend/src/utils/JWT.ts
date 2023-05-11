import * as jwt from 'jsonwebtoken';
import { IToken } from '../types/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const configJWT: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

const generateToken = (user: IToken): string =>
  jwt.sign({ email: user.email }, JWT_SECRET, configJWT);

const verifyToken = (token: string): string | object => jwt.verify(token, JWT_SECRET);

export { generateToken, verifyToken };
