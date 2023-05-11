import * as bcrypt from 'bcryptjs';
import User from '../../database/models/UserModel';

const userInput = {
  email: 'validemail@email.com',
  password: 'validpassword',
};

const hash = bcrypt.hashSync(userInput.password, 10);

const userOutput = {
  dataValues: {
    id: 1,
    email: 'validemail@email.com',
    password: hash,
    role: 'admin',
  },
} as User;

const noEmail = {
  email: null,
  password: 'validpassword',
};

const invalidEmail = {
  email: 'invalidEmail',
  password: 'validpassword',
};

const noPassword = {
  email: 'validemail@email.com',
  password: null,
};

const invalidPassword = {
  email: 'validemail@email.com',
  password: '123',
};

export { userInput, userOutput, noEmail, noPassword, invalidEmail, invalidPassword };