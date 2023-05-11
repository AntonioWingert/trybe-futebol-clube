import * as bcrypt from 'bcryptjs';
import HttpException from '../utils/HttpException';
import { generateToken } from '../utils/JWT';
import { IUser } from '../types/IUser';
import UserModel from '../database/models/UserModel';

export default class LoginService {
  public static async login(user: IUser): Promise<string> {
    const userData = await UserModel.findOne({ where: { email: user.email } });

    if (!userData) {
      throw new HttpException(401, 'Invalid email or password');
    }

    if (!bcrypt.compareSync(user.password, userData.dataValues.password)) {
      throw new HttpException(401, 'Invalid email or password');
    }

    const { email, role, password } = userData.dataValues;

    return generateToken({ email, password, role });
  }
}
