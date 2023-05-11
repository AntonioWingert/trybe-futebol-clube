import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { invalidEmail, noEmail, noPassword, userInput, userOutput } from './mocks/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test for /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return 200 and a token when login is successful', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);

    const res = await chai.request(app).post('/login').send(userInput);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should return 401 if email is not provided', async () => {
    const res = await chai.request(app).post('/login').send(noEmail);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return 401 if password is not provided', async () => {
    const res = await chai.request(app).post('/login').send(noPassword);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return 401 if email is invalid', async () => {
    const res = await chai.request(app).post('/login').send(invalidEmail);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Invalid email or password' });
  });
});