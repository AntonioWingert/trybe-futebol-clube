import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { invalidEmail, invalidPassword, noEmail, noPassword, userInput, userOutput } from './mocks/mockUser';
import { generateToken } from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test for /login', () => {
  let modelUserStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  it('should return 200 and a token when login is successful', async () => {
    modelUserStub = sinon.stub(Model, 'findOne').resolves(userOutput);

    const res = await chai.request(app).post('/login').send(userInput);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should return 400 if email is not provided', async () => {
    const res = await chai.request(app).post('/login').send(noEmail);

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return 400 if password is not provided', async () => {
    const res = await chai.request(app).post('/login').send(noPassword);

    expect(res.status).to.equal(400);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return 401 if email is invalid', async () => {
    const res = await chai.request(app).post('/login').send(invalidEmail);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return 401 if password is invalid', async () => {
    const res = await chai.request(app).post('/login').send(invalidPassword);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return 500 if an error occurs', async () => {
    modelUserStub = sinon.stub(Model, 'findOne').throws('Error');

    const res = await chai.request(app).post('/login').send(userInput);

    expect(res.status).to.equal(500);
    expect(res.body).to.deep.equal({ message: 'Internal server error' });
  });
});

describe('Integration test for /login/role', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return 200 and a token when login is successful', async () => {
    sinon.stub(Model, 'findOne').resolves(userOutput);
    const loginRes = await chai.request(app).post('/login').send(userInput);

    const res = await chai.request(app)
      .get('/login/role')
      .set('Authorization', loginRes.body.token);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('role');
  });

  it('should return 401 if token is invalid', async () => {
    const res = await chai.request(app).get('/login/role');

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Token not found' });
  });

  it('should return 401 if token is send but invalid', async () => {
    const res = await chai.request(app)
      .get('/login/role')
      .set('Authorization', 'invalid_token');

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('should return 500 if an error occurs', async () => {
    sinon.stub(Model, 'findOne').throws('Error');

    const res = await chai.request(app)
      .get('/login/role')
      .set('Authorization', generateToken(userOutput));
    
    expect(res.status).to.equal(500);
    expect(res.body).to.deep.equal({ message: 'Internal server error' });
  });
});